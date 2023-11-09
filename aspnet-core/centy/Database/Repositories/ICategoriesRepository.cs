using centy.Domain.Categories;

namespace centy.Database.Repositories;

public interface ICategoriesRepository
{
    Task<List<Category>> GetUserCategories(Guid userId);

    Task InsertAsync(Category category);

    Task<bool> UpdateAsync(Category category);

    Task DeleteAsync(List<Guid> categoryIds, Guid userId);
}
