namespace centy.Infrastructure;

public static class EnvironmentVariables
{
    private const string PortException = "Port configuration is invalid";

    public static readonly int ApplicationPort =
        int.Parse(Environment.GetEnvironmentVariable("PORT") ?? throw new Exception(PortException));

    public static readonly int ApplicationHttpsPort =
        int.Parse(Environment.GetEnvironmentVariable("HTTPS_PORT") ?? throw new Exception(PortException));

    public static readonly bool IsDevelopment =
        Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development";

    public static readonly string TokenIssuer =
        Environment.GetEnvironmentVariable("JWT_ISSUER") ?? "centy";

    public static readonly string TokenAudience =
        Environment.GetEnvironmentVariable("JWT_AUDIENCE") ?? "centy";

    public static readonly string TokenSigningKey =
        Environment.GetEnvironmentVariable("JWT_KEY") ?? "98cf0eed-4b0c-405f-9913-dce91b99a506";

    public static readonly string AllowedOrigin =
        Environment.GetEnvironmentVariable("CORS") ?? throw new Exception("CORS should be set");

    public static readonly string MongoConnectionString =
        Environment.GetEnvironmentVariable("MONGODB") ?? throw new Exception("Connection string should be set");
}
