namespace centy.Domain.Currencies;

public record ExchangeRates
{
    public string? BaseCurrency { get; init; }
    public DateTime Date { get; init; }
    public List<ExchangeRate>? Rates { get; init; }
}
