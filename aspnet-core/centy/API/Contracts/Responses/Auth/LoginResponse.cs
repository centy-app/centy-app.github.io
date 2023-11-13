namespace centy.API.Contracts.Responses.Auth;

public record LoginResponse
{
    public string? Email { get; init; }
    public string? Token { get; init; }
    public string? BaseCurrencyCode { get; init; }
}
