using System.Net;
using FastEndpoints.Swagger;
using FastEndpoints.Security;
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
                options.Listen(IPAddress.Loopback, EnvironmentVariables.ApplicationHttpsPort,
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

        services.AddAuthenticationJwtBearer(s => { s.SigningKey = EnvironmentVariables.TokenSigningKey; });

        services.AddAuthorization();
        services.AddFastEndpoints(o => o.IncludeAbstractValidators = true);

        services.AddMvcCore().AddApiExplorer();
        services.SwaggerDocument(o =>
        {
            o.DocumentSettings = s =>
            {
                s.Title = "Centy API";
                s.Version = "v1";
            };
        });
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
            app.UseSwaggerGen();
            app.UseSwaggerUi();
        }

        app.Run();
    }
}
