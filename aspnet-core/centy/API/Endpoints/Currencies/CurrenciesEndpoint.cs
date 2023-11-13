using centy.Domain.ValueObjects.Currencies;
using centy.Domain.Services.Currencies;
using centy.Infrastructure;

namespace centy.API.Endpoints.Currencies;

public class CurrenciesEndpoint : EndpointWithoutRequest<List<Currency>>
{
    private readonly ICurrenciesService _currenciesService;

    public CurrenciesEndpoint(ICurrenciesService currenciesService)
    {
        _currenciesService = currenciesService;
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
            ThrowError(ex.Message);
        }
    }
}
