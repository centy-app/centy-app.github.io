using System.ComponentModel.DataAnnotations;

namespace centy.Contracts.Requests.Auth;

public class LoginRequest
{
    [EmailAddress]
    public string Email { get; init; } = default!;
    public string Password { get; init; } = default!;
}
