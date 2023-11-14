using System.Net;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using FastEndpoints.Swagger;
using centy.API.Contracts.Responses.Infrastructure;
using centy.Domain.Entities.Auth;
using centy.Infrastructure;

namespace centy;

public class Startup
{
    private const string AllowOrigins = "_centyOrigins";
    public IConfiguration Configuration { get; }

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public void ConfigureWebHost(ConfigureWebHostBuilder webHost)
    {
        webHost.ConfigureKestrel(options =>
        {
            options.Listen(IPAddress.Any, EnvironmentVariables.ApplicationPort);
            if (EnvironmentVariables.IsDevelopment)
            {
                options.Listen(
                    IPAddress.Loopback, EnvironmentVariables.ApplicationHttpsPort,
                    listenOptions => { listenOptions.UseHttps("dev-cert.pfx", "localhost"); });
            }
        });
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy(name: AllowOrigins,
                policy =>
                {
                    policy.WithOrigins($"https://{EnvironmentVariables.AllowedOrigin}",
                        $"http://{EnvironmentVariables.AllowedOrigin}");
                    policy.AllowAnyMethod();
                    policy.AllowAnyHeader();
                });
        });

        services.AddIdentity<ApplicationUser, ApplicationRole>(o =>
            {
                o.Password.RequireDigit = false;
                o.Password.RequireLowercase = false;
                o.Password.RequireUppercase = false;
                o.Password.RequireNonAlphanumeric = false;
                o.Password.RequiredLength = 5;
            })
            .AddMongoDbStores<ApplicationUser, ApplicationRole, Guid>(EnvironmentVariables.MongoConnectionString,
                "centy");

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
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = EnvironmentVariables.TokenIssuer,
                    ValidAudience = EnvironmentVariables.TokenAudience,
                    IssuerSigningKey =
                        new SymmetricSecurityKey(
                            System.Text.Encoding.UTF8.GetBytes(EnvironmentVariables.TokenSigningKey))
                };
            });

        services.AddSwaggerDoc();
    }

    public void Configure(WebApplication app, IWebHostEnvironment env)
    {
        app.UseCors(AllowOrigins);
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
