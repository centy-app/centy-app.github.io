using centy.Domain.Entities.Currencies;

namespace centy.Domain.Services.Currencies;

public interface IExchangeRateService
{
    Task<ExchangeRates> GetLatestAsync();
}
