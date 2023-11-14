using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using centy.Infrastructure.Database.Repositories;
using centy.Domain.Entities.Currencies;
using centy.Infrastructure;

namespace centy.Domain.Services.Currencies;

public class ExchangeRateService : IExchangeRateService
{
    private const string LatestRatesApiUrl = "http://api.exchangerate.host/live";
    private readonly IExchangeRatesRepository _exchangeRatesRepository;
    private readonly ILogger<ExchangeRateService> _logger;

    public ExchangeRateService(IExchangeRatesRepository exchangeRatesRepository, ILogger<ExchangeRateService> logger)
    {
        _exchangeRatesRepository = exchangeRatesRepository;
        _logger = logger;
    }

    public async Task<ExchangeRates> GetLatestAsync()
    {
        var cachedRates = await _exchangeRatesRepository.GetLatestAsync();
        if (cachedRates != null && DateOnly.FromDateTime(cachedRates.Date) == DateOnly.FromDateTime(DateTime.UtcNow))
        {
            return cachedRates;
        }

        try
        {
            var rates = await GetLatestFromRemoteAsync();
            await _exchangeRatesRepository.SetLatestAsync(rates);
            return rates;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occur while retrieving exchange rates: {Exception}", ex.Message);
            return cachedRates ?? throw new Exception("Exchange rates cache is missing.");
        }
    }

    private async Task<ExchangeRates> GetLatestFromRemoteAsync()
    {
        using HttpClient client = new();
        var url = $"{LatestRatesApiUrl}?source={CurrenciesService.BaseCurrency}" +
                  $"&access_key={EnvironmentVariables.ExchangeRateApiKey}";

        var response = await client.GetAsync(url);
        if (!response.IsSuccessStatusCode)
        {
            throw new Exception($"Can't retrieve latest rates from remote. Status code: {response.StatusCode}.");
        }

        var jsonString = await response.Content.ReadAsStringAsync();
        var rates = DeserializeExchangeRates(jsonString);

        return new ExchangeRates
        {
            BaseCurrency = CurrenciesService.BaseCurrency,
            Date = DateTime.UtcNow,
            Rates = rates
        };
    }

    private static List<ExchangeRate> DeserializeExchangeRates(string jsonString)
    {
        dynamic data = JsonConvert.DeserializeObject(jsonString);
        if (!(bool)data.success) throw new Exception((string)data.error.info);
        var rates = new List<ExchangeRate>();
        var baseCurrencyLength = CurrenciesService.BaseCurrency.Length;
        foreach (JProperty rate in data.quotes)
        {
            rates.Add(new ExchangeRate
            {
                Code = rate.Name.ToUpperInvariant()[baseCurrencyLength..],
                Rate = (double)rate.Value
            });
        }

        return rates;
    }
}
