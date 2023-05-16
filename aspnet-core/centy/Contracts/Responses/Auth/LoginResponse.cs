namespace centy.Contracts.Responses.Auth;

public class LoginResponse
{
    public string? Email { get; init; }
    public string? Token { get; init; }
    public string? BaseCurrencyCode { get; init; }
}
