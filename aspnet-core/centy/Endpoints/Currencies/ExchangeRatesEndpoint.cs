using FastEndpoints;
using centy.Domain.Currencies;
using centy.Services.Currencies;

namespace centy.Endpoints.Currencies;

[HttpGet("currencies/exchangeRates")]
public class ExchangeRatesEndpoint : EndpointWithoutRequest<ExchangeRates>
{
    private readonly IExchangeRateService _exchangeRateService;

    public ExchangeRatesEndpoint(IExchangeRateService exchangeRateService)
    {
        _exchangeRateService = exchangeRateService;
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var result = await _exchangeRateService.GetLatestAsync();

        await SendOkAsync(result, ct);
    }
}
