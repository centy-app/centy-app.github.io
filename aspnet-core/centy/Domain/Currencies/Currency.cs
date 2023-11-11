namespace centy.Domain.Currencies;

public record Currency
{
    public string? Code { get; init; }
    public string? Description { get; init; }
    public string? Symbol { get; init; }
}
