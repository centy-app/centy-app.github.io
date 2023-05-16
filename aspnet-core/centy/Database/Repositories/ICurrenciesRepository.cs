using centy.Domain.Currencies;

namespace centy.Database.Repositories;

public interface ICurrenciesRepository
{
    Task<List<Currency>> GetAll();

    Task InsertManyAsync(IEnumerable<Currency> currencies);
}
