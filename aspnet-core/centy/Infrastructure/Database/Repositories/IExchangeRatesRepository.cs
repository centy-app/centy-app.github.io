using centy.Domain.Entities.Currencies;

namespace centy.Infrastructure.Database.Repositories;

public interface IExchangeRatesRepository
{
    Task<ExchangeRates?> GetLatestAsync();

    Task SetLatestAsync(ExchangeRates exchangeRates);
}
