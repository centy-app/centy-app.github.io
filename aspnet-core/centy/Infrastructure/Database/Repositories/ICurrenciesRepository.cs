using centy.Domain.ValueObjects.Currencies;

namespace centy.Infrastructure.Database.Repositories;

public interface ICurrenciesRepository
{
    bool Exist(string? code);

    Task<List<Currency>> GetAll();

    Task InsertManyAsync(IEnumerable<Currency> currencies);
}
