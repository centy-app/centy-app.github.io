using centy;

var builder = WebApplication.CreateBuilder(args);
var startup = new Startup(builder.Configuration);

startup.ConfigureServices(builder.Services);
startup.ConfigureWebHost(builder.WebHost);

var app = builder.Build();
startup.Configure(app, builder.Environment);
