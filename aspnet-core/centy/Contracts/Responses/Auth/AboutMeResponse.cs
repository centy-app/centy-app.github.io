namespace centy.Contracts.Responses.Auth;

public class AboutMeResponse
{
    public Guid Id { get; init; }
    public string? Email { get; init; }
    public string? BaseCurrencyCode { get; init; }
}
