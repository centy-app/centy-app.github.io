using System.ComponentModel.DataAnnotations;

namespace centy.API.Contracts.Requests.Auth;

public record LoginRequest
{
    [EmailAddress]
    public string? Email { get; init; }
    public string? Password { get; init; }
}
