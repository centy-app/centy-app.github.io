using System.ComponentModel.DataAnnotations;

namespace centy.Contracts.Requests.Auth;

public class RegisterRequest
{
    [EmailAddress]
    public string Email { get; init; } = default!;
    public string Password { get; init; } = default!;
    public string BaseCurrencyCode { get; init; } = default!;
}
