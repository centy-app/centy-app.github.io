using centy.Domain.ValueObjects.Currencies;

namespace centy.Domain.Services.Currencies;

public interface IExchangeRateService
{
    Task<ExchangeRates> GetLatestAsync();
}
