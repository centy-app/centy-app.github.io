using centy.Domain.Currencies;

namespace centy.Database.Repositories;

public interface IExchangeRatesRepository
{
    Task<ExchangeRates?> GetLatestAsync();
    Task SetLatestAsync(ExchangeRates exchangeRates);
}
