using System.ComponentModel.DataAnnotations;

namespace centy.API.Contracts.Requests.Auth;

public record RegisterRequest
{
    [EmailAddress]
    public string? Email { get; init; }
    public string? Password { get; init; }
    public string? BaseCurrencyCode { get; init; }
}
