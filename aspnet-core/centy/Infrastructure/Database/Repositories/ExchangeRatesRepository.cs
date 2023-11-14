using MongoDB.Driver;
using centy.Domain.Entities.Currencies;

namespace centy.Infrastructure.Database.Repositories;

/// <summary>
/// ExchangeRatesRepository is a unique database table as it always contains only one record of data,
/// used as a persistent cache for currency exchange rates
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
        return await _exchangeRates.Find(_ => true).FirstOrDefaultAsync();
    }

    public async Task SetLatestAsync(ExchangeRates exchangeRates)
    {
        await _exchangeRates.DeleteManyAsync(e => true);
        await _exchangeRates.InsertOneAsync(exchangeRates);
    }
}
