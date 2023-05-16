using centy.Database.Repositories;
using centy.Services.Auth;
using centy.Services.Currencies;
using Microsoft.AspNetCore.Authorization;

namespace centy.Infrastructure;

public static class DependencyInjection
{
    public static void ConfigureDependencyInjection(IServiceCollection services)
    {
        services.AddSingleton<IAuthorizationMiddlewareResultHandler, CustomAuthResultHandler>();
        services.AddSingleton<IJwtService, JwtService>();
        services.AddSingleton<IExchangeRateService, ExchangeRateService>();
        services.AddTransient<IExchangeRatesRepository, ExchangeRatesRepository>();
        services.AddTransient<ICurrenciesService, CurrenciesService>();
        services.AddTransient<ICurrenciesRepository, CurrenciesRepository>();
    }
}
