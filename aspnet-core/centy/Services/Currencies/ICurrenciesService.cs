using centy.Domain.Currencies;

namespace centy.Services.Currencies;

public interface ICurrenciesService
{
    bool CurrencyExist(string? code);

    Task<List<Currency>> GetAvailableAsync();
}
