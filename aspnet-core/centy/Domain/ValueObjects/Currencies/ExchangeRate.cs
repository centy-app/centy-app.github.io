namespace centy.Domain.ValueObjects.Currencies;

public record ExchangeRate
{
    public string? Code { get; init; }
    public double Rate { get; init; }
}
