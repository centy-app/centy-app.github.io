var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var httpPortString = Environment.GetEnvironmentVariable("HTTPPORT");
_ = int.TryParse(httpPortString, out var httpPort);

var portString = Environment.GetEnvironmentVariable("PORT");
_ = int.TryParse(portString, out var port);

var aspNetEnv = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(httpPort); // to listen for incoming http connection on port 80
    if (aspNetEnv == "Development")
    {
        options.ListenAnyIP(port, configure => configure.UseHttps()); // to listen for incoming https connection on port 443
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
