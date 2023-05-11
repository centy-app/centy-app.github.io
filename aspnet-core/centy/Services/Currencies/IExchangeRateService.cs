using centy.Domain.Currencies;

namespace centy.Services.Currencies;

public interface IExchangeRateService
{
    Task<ExchangeRates> GetLatestAsync();
}
