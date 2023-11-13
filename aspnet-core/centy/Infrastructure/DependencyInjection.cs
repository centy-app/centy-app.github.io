using Microsoft.AspNetCore.Authorization;
using centy.Infrastructure.Database.Repositories;
using centy.Domain.Services.Categories;
using centy.Domain.Services.Currencies;
using centy.Domain.Services.Auth;

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
        services.AddTransient<ICategoriesRepository, CategoriesRepository>();
        services.AddTransient<ICategoriesService, CategoriesService>();
        services.AddTransient<IUserService, UserService>();
    }
}
