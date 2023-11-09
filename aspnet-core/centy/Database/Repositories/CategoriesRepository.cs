using centy.Domain.Categories;
using MongoDB.Driver;

namespace centy.Database.Repositories;

public class CategoriesRepository : BaseRepository, ICategoriesRepository
{
    private readonly IMongoCollection<Category> _categories;

    public CategoriesRepository()
    {
        _categories = Database.GetCollection<Category>("Categories");
    }

    public async Task<List<Category>> GetAll()
    {
        return await _categories.Aggregate().ToListAsync();
    }

    public async Task InsertAsync(Category category)
    {
        await _categories.InsertOneAsync(category);
    }

    public async Task DeleteAsync(List<Guid> categories)
    {
        await _categories.DeleteManyAsync(category => categories.Contains(category.Id));
    }
}
