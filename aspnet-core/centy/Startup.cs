using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using FastEndpoints;
using FastEndpoints.Swagger;
using centy.Contracts.Responses.Infrastructure;
using centy.Database.Repositories;
using centy.Infrastructure;
using centy.Domain.Auth;
using centy.Services.Auth;
using centy.Services.Currencies;

namespace centy
{
    public class Startup
    {
        private const string PortException = "Port configuration is invalid";
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureWebHost(ConfigureWebHostBuilder webHost)
        {
            webHost.ConfigureKestrel(options =>
            {
                var port = int.Parse(Environment.GetEnvironmentVariable("PORT") ?? throw new Exception(PortException));
                var httpsPort = int.Parse(Environment.GetEnvironmentVariable("HTTPSPORT") ?? throw new Exception(PortException));

                options.ListenAnyIP(port); // to listen for incoming http connection on port 80

                if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
                {
                    // Not working in local Docker so far due to missing certificate
                    options.ListenAnyIP(httpsPort, configure => configure.UseHttps());
                }
            });
        }

        public void ConfigureDependencyInjection(IServiceCollection services)
        {
            services.AddSingleton<IAuthorizationMiddlewareResultHandler, CustomAuthResultHandler>();
            services.AddSingleton<IJwtService, JwtService>();
            services.AddSingleton<IExchangeRateService, ExchangeRateService>();
            services.AddTransient<IExchangeRatesRepository, ExchangeRatesRepository>();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Environment.GetEnvironmentVariable("MONGODB");
            services.AddIdentity<ApplicationUser, ApplicationRole>(o =>
                {
                    o.Password.RequireDigit = false;
                    o.Password.RequireLowercase = false;
                    o.Password.RequireUppercase = false;
                    o.Password.RequireNonAlphanumeric = false;
                    o.Password.RequiredLength = 5;
                })
                .AddMongoDbStores<ApplicationUser, ApplicationRole, Guid>(connectionString, "centy");

            services.AddFastEndpoints(o => o.IncludeAbstractValidators = true);

            services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddCookie(options => options.SlidingExpiration = true)
                .AddJwtBearer(option =>
                {
                    option.SaveToken = true;
                    option.TokenValidationParameters = new TokenValidationParameters
                    {
                        SaveSigninToken = true,
                        ValidateIssuer = true,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = "centy",
                        ValidAudience = "centy",
                        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(JwtService.TokenSigningKey))
                    };
                });

            services.AddSwaggerDoc();
        }

        public void Configure(WebApplication app, IWebHostEnvironment env)
        {
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseFastEndpoints(x =>
            {
                x.Errors.ResponseBuilder = (failures, ctx, statusCode) =>
                {
                    return new ValidationFailureResponse
                    {
                        Errors = failures.Select(y => y.ErrorMessage).ToList()
                    };
                };
            });

            if (env.IsDevelopment())
            {
                app.UseOpenApi();
                app.UseSwaggerUi3(s => s.ConfigureDefaults());
            }

            app.Run();
        }
    }
}
