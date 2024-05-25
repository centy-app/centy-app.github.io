using centy.Domain.Entities.Currencies;
using centy.Domain.Services.Currencies;
using centy.Infrastructure;

namespace centy.API.Endpoints.Currencies;

public class ExchangeRatesEndpoint : EndpointWithoutRequest<ExchangeRates>
{
    private readonly IExchangeRateService _exchangeRateService;
    private readonly ILogger<ExchangeRatesEndpoint> _logger;

    public ExchangeRatesEndpoint(IExchangeRateService exchangeRateService, ILogger<ExchangeRatesEndpoint> logger)
    {
        _exchangeRateService = exchangeRateService;
        _logger = logger;
    }

    public override void Configure()
    {
        Get("currencies/exchangeRates");
        if (!EnvironmentVariables.IsDevelopment)
        {
            ResponseCache(3600);
        }
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
            _logger.LogWarning("Exchange rates could not be retrieved, error message: {Exception}", ex.Message);
            ThrowError("Exchange rates could not be retrieved.");
        }
    }
}
