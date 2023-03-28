var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var portString = Environment.GetEnvironmentVariable("PORT");
_ = int.TryParse(portString, out var port);

var httpPortString = Environment.GetEnvironmentVariable("HTTPSPORT");
_ = int.TryParse(httpPortString, out var httpsPort);

var aspNetEnv = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(port); // to listen for incoming http connection on port 80

    if (aspNetEnv == "Development")
    {
        // Not working in local Docker so far due to missing certificate
        options.ListenAnyIP(httpsPort, configure => configure.UseHttps()); // to listen for incoming https connection on port 443
    }
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
