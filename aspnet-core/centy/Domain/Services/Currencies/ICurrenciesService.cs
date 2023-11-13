using centy.Domain.ValueObjects.Currencies;

namespace centy.Domain.Services.Currencies;

public interface ICurrenciesService
{
    bool CurrencyExist(string? code);

    Task<List<Currency>> GetAvailableAsync();
}
