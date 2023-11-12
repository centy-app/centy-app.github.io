using centy.Domain.Currencies;

namespace centy.Database.Repositories;

public interface ICurrenciesRepository
{
    bool Exist(string? code);

    Task<List<Currency>> GetAll();

    Task InsertManyAsync(IEnumerable<Currency> currencies);
}
