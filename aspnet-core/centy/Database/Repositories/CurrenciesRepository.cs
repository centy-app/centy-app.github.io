using MongoDB.Driver;
using centy.Domain.Currencies;

namespace centy.Database.Repositories;

public class CurrenciesRepository : BaseRepository, ICurrenciesRepository
{
    private readonly IMongoCollection<Currency> _currencies;

    public CurrenciesRepository()
    {
        _currencies = Database.GetCollection<Currency>("Currencies");
    }

    public bool Exist(string? code)
    {
        if (code == null) return false;
        var currency = _currencies.Find(c => c.Code == code).FirstOrDefault();
        return currency is not null;
    }

    public async Task<List<Currency>> GetAll()
    {
        return await _currencies.Aggregate().ToListAsync();
    }

    public async Task InsertManyAsync(IEnumerable<Currency> currencies)
    {
        await _currencies.InsertManyAsync(currencies);
    }
}
