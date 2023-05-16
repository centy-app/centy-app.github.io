using centy;
using centy.Database;
using centy.Infrastructure;

CentyDbInitializer.RegisterMappings();

var builder = WebApplication.CreateBuilder(args);
var startup = new Startup(builder.Configuration);

DependencyInjection.ConfigureDependencyInjection(builder.Services);
startup.ConfigureServices(builder.Services);
startup.ConfigureWebHost(builder.WebHost);

var app = builder.Build();
startup.Configure(app, builder.Environment);
