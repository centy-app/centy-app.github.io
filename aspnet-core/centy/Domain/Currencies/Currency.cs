namespace centy.Domain.Currencies;

public class Currency
{
    public Currency(string code, string description, string symbol)
    {
        Code = code;
        Description = description;
        Symbol = symbol;
    }

    public string Code { get; set; }
    public string Description { get; set; }
    public string Symbol { get; set; }
}
