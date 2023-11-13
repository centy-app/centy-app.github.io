namespace centy.API.Contracts.Responses.Auth;

public record AboutMeResponse
{
    public Guid Id { get; init; }
    public string? Email { get; init; }
    public string? BaseCurrencyCode { get; init; }
}
