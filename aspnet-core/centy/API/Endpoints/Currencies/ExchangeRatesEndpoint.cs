using centy.Domain.ValueObjects.Currencies;
using centy.Domain.Services.Currencies;
using centy.Infrastructure;

namespace centy.API.Endpoints.Currencies;

public class ExchangeRatesEndpoint : EndpointWithoutRequest<ExchangeRates>
{
    private readonly IExchangeRateService _exchangeRateService;

    public ExchangeRatesEndpoint(IExchangeRateService exchangeRateService)
    {
        _exchangeRateService = exchangeRateService;
    }

    public override void Configure()
    {
        Get("currencies/exchangeRates");
        if (!EnvironmentVariables.IsDevelopment) ResponseCache(3600);
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        try
        {
            var result = await _exchangeRateService.GetLatestAsync();
            await SendOkAsync(result, ct);
        }
        catch (Exception ex)
        {
            ThrowError(ex.Message);
        }
    }
}
