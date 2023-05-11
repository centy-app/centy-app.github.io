namespace centy.Domain.Currencies;

public class ExchangeRates
{
    public ExchangeRates(string baseCurrency, DateTime date, List<ExchangeRate> rates)
    {
        BaseCurrency = baseCurrency;
        Date = date;
        Rates = rates;
    }
    
    public string BaseCurrency { get; set; }
    public DateTime Date { get; set; }
    public List<ExchangeRate> Rates { get; set; }
}
