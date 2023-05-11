namespace centy.Domain.Currencies;

public class ExchangeRate
{
    public ExchangeRate(string code, double rate)
    {
        Code = code;
        Rate = rate;
    }

    public string Code { get; set; }
    public double Rate { get; set; }
}
