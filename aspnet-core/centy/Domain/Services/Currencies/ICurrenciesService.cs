using centy.Domain.Entities.Currencies;

namespace centy.Domain.Services.Currencies;

public interface ICurrenciesService
{
    bool CurrencyExist(string? code);

    Task<List<Currency>> GetAvailableAsync();
}
