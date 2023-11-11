using System.ComponentModel.DataAnnotations;

namespace centy.Contracts.Requests.Auth;

public class RegisterRequest
{
    [EmailAddress] public string? Email { get; init; }
    public string? Password { get; init; }
    public string? BaseCurrencyCode { get; init; }
}
