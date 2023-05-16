using centy.Domain.Currencies;
using centy.Services.Currencies;

namespace centy.Endpoints.Currencies;

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
        ResponseCache(3600);
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var result = await _exchangeRateService.GetLatestAsync();

        await SendOkAsync(result, ct);
    }
}
