using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using centy.Database.Repositories;
using centy.Domain.Currencies;
using centy.Infrastructure;

namespace centy.Services.Currencies;

public class CurrenciesService : ICurrenciesService
{
    public const string BaseCurrency = "USD";
    private const string SymbolsApiUrl = "http://api.exchangerate.host/list";
    private readonly ICurrenciesRepository _currenciesRepository;
    private readonly ILogger<CurrenciesService> _logger;

    public CurrenciesService(ICurrenciesRepository repository, ILogger<CurrenciesService> logger)
    {
        _currenciesRepository = repository;
        _logger = logger;
    }

    public async Task<List<Currency>> GetAvailableAsync()
    {
        var cachedCurrencies = await _currenciesRepository.GetAll();
        if (cachedCurrencies.Count > 0)
        {
            return cachedCurrencies;
        }

        try
        {
            var currencies = await GetAvailableFromRemoteAsync();
            await _currenciesRepository.InsertManyAsync(currencies);

            return currencies;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occur while retrieving available currencies: {Exception}", ex.Message);
            return cachedCurrencies ?? throw new Exception("Currencies data is missing.");
        }
    }

    private async Task<List<Currency>> GetAvailableFromRemoteAsync()
    {
        using HttpClient client = new();
        var response = await client.GetAsync($"{SymbolsApiUrl}?access_key={EnvironmentVariables.ExchangeRateApiKey}");

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception($"Can't retrieve symbols from remote. Status code: {response.StatusCode}");
        }

        var jsonString = await response.Content.ReadAsStringAsync();
        dynamic data = JsonConvert.DeserializeObject(jsonString);

        if (!(bool)data.success)
        {
            throw new Exception((string)data.error.info);
        }

        var currencies = new List<Currency>();
        foreach (JProperty symbol in data.currencies)
        {
            var currency = TeixeiraSoftware.Finance.Currency.AllCurrencies.FirstOrDefault(c => c.Symbol == symbol.Name);
            var sign = string.IsNullOrWhiteSpace(currency.Sign)
                ? symbol.Name.ToLowerInvariant()
                : currency.Sign.ToLower();

            currencies.Add(new Currency
            {
                Code = symbol.Name.ToUpperInvariant(),
                Description = (string)symbol.Value,
                Symbol = sign
            });
        }

        return currencies;
    }
}
