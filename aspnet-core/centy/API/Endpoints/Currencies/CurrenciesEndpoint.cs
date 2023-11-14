using centy.Domain.Entities.Currencies;
using centy.Domain.Services.Currencies;
using centy.Infrastructure;

namespace centy.API.Endpoints.Currencies;

public class CurrenciesEndpoint : EndpointWithoutRequest<List<Currency>>
{
    private readonly ICurrenciesService _currenciesService;
    private readonly ILogger<CurrenciesEndpoint> _logger;

    public CurrenciesEndpoint(ICurrenciesService currenciesService, ILogger<CurrenciesEndpoint> logger)
    {
        _currenciesService = currenciesService;
        _logger = logger;
    }

    public override void Configure()
    {
        AllowAnonymous();
        Get("currencies/symbols");
        if (!EnvironmentVariables.IsDevelopment) ResponseCache(3600);
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        try
        {
            var result = await _currenciesService.GetAvailableAsync();
            await SendOkAsync(result, ct);
        }
        catch (Exception ex)
        {
            _logger.LogWarning("Currencies could not be retrieved, error message: {Exception}", ex.Message);
            ThrowError("Currencies could not be retrieved.");
        }
    }
}
