using System.ComponentModel.DataAnnotations;

namespace centy.Contracts.Requests.Auth;

public class LoginRequest
{
    [EmailAddress] public string? Email { get; init; }
    public string? Password { get; init; }
}
