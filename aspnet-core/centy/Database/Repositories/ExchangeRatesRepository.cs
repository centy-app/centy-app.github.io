using MongoDB.Driver;
using centy.Domain.Currencies;

namespace centy.Database.Repositories;

/// <summary>
/// ExchangeRatesRepository is a bit unique database table, it always contain only one line of data,
/// used as a persistant cache for currencies exchange rates
/// </summary>
public class ExchangeRatesRepository : BaseRepository, IExchangeRatesRepository
{
    private readonly IMongoCollection<ExchangeRates> _exchangeRates;

    public ExchangeRatesRepository()
    {
        _exchangeRates = Database.GetCollection<ExchangeRates>("ExchangeRates");
    }

    public async Task<ExchangeRates?> GetLatestAsync()
    {
        return await _exchangeRates.Find(e => true).FirstOrDefaultAsync();
    }

    public async Task SetLatestAsync(ExchangeRates exchangeRates)
    {
        await _exchangeRates.DeleteManyAsync(e => true);
        await _exchangeRates.InsertOneAsync(exchangeRates);
    }
}
