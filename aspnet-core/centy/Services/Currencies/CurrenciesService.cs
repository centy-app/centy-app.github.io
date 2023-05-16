using Newtonsoft.Json;
using centy.Data.Currencies;
using centy.Database.Repositories;
using centy.Domain.Currencies;

namespace centy.Services.Currencies;

public class CurrenciesService : ICurrenciesService
{
    public const string BaseCurrency = "USD";
    private const string SymbolsApiUrl = "https://api.exchangerate.host/symbols";
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
        var response = await client.GetAsync(SymbolsApiUrl);

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception($"Can't retrieve symbols from remote. Status code: {response.StatusCode}");
        }

        var jsonString = await response.Content.ReadAsStringAsync();
        var data = JsonConvert.DeserializeObject<SymbolsDto>(jsonString);

        var currencies = new List<Currency>();
        foreach (var symbol in data.Symbols)
        {
            var currency = TeixeiraSoftware.Finance.Currency.AllCurrencies.FirstOrDefault(c =>
                c.Symbol == symbol.Value.Code);
            var sign = string.IsNullOrWhiteSpace(currency.Sign) ? symbol.Value.Code.ToLower() : currency.Sign;

            currencies.Add(new Currency(symbol.Value.Code, symbol.Value.Description, sign));
        }

        return currencies;
    }
}
