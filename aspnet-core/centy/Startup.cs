using FastEndpoints;
using FastEndpoints.Security;
using FastEndpoints.Swagger;
using centy.Domain.Auth;
using centy.Contracts.Responses.Validation;

namespace centy
{
    public class Startup
    {
        public IConfiguration Configuration
        {
            get;
        }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureWebHost(ConfigureWebHostBuilder webHost)
        {
            var portString = Environment.GetEnvironmentVariable("PORT");
            _ = int.TryParse(portString, out var port);

            var httpPortString = Environment.GetEnvironmentVariable("HTTPSPORT");
            _ = int.TryParse(httpPortString, out var httpsPort);

            var aspNetEnv = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            webHost.ConfigureKestrel(options =>
            {
                options.ListenAnyIP(port); // to listen for incoming http connection on port 80

                if (aspNetEnv == "Development")
                {
                    // Not working in local Docker so far due to missing certificate
                    options.ListenAnyIP(httpsPort, configure => configure.UseHttps()); // to listen for incoming https connection on port 443
                }
            });
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

            var tokenSigningKey = Environment.GetEnvironmentVariable("JWTKEY") ?? "";
            services.AddJWTBearerAuth(tokenSigningKey);

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

            if (app.Environment.IsDevelopment())
            {
                app.UseOpenApi();
                app.UseSwaggerUi3(s => s.ConfigureDefaults());
            }

            app.Run();
        }
    }
}
