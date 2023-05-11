using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using centy.Database.Repositories;
using centy.Domain.Currencies;

namespace centy.Services.Currencies;

public class ExchangeRateService : IExchangeRateService
{
    private const string BaseCurrency = "USD";
    private const string LatestRateApiUrl = "https://api.exchangerate.host/latest";
    private readonly IExchangeRatesRepository _repository;
    private readonly ILogger<ExchangeRateService> _logger;

    public ExchangeRateService(IExchangeRatesRepository repository, ILogger<ExchangeRateService> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    public async Task<ExchangeRates> GetLatest()
    {
        var cachedRates = await _repository.GetLatestAsync();
        if (cachedRates != null && DateOnly.FromDateTime(cachedRates.Date) == DateOnly.FromDateTime(DateTime.UtcNow))
        {
            return cachedRates;
        }

        try
        {
            var rates = await GetLatestFromRemote();
            await _repository.SetLatestAsync(rates);

            return rates;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occur while retrieving exchange rates: {Exception}", ex.Message);
            return cachedRates ?? throw new Exception("Exchange rates unavailable.");
        }
    }

    private async Task<ExchangeRates> GetLatestFromRemote()
    {
        using HttpClient client = new();
        var response = await client.GetAsync($"{LatestRateApiUrl}?base={BaseCurrency}");

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception("Cant retrieve latest rates from remote.");
        }

        var jsonString = await response.Content.ReadAsStringAsync();
        dynamic data = JsonConvert.DeserializeObject(jsonString);

        var rates = new List<ExchangeRate>();
        foreach (JProperty rate in data.rates)
        {
            rates.Add(new ExchangeRate(rate.Name, (double)rate.Value));
        }

        return new ExchangeRates(BaseCurrency, DateTime.UtcNow, rates);
    }
}
