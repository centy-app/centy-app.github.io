﻿using centy.Domain.Currencies;
using centy.Services.Currencies;

namespace centy.Endpoints.Currencies;

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
        ResponseCache(3600);
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var result = await _currenciesService.GetAvailableAsync();

        await SendOkAsync(result, ct);
    }
}
