using centy.Domain.Auth;

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
            services.AddIdentity<ApplicationUser, ApplicationRole>().AddMongoDbStores<ApplicationUser, ApplicationRole, Guid>(connectionString, "centy");

            // Add services to the container.
            services.AddControllers();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
        }

        public void Configure(WebApplication app, IWebHostEnvironment env)
        {
            // Configure the HTTP request pipeline.

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthentication();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
