using centy.Domain.Currencies;

namespace centy.Services.Currencies;

public interface ICurrenciesService
{
    Task<List<Currency>> GetAvailableAsync();
}
