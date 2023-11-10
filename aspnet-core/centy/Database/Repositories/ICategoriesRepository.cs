using centy.Domain.Categories;

namespace centy.Database.Repositories;

public interface ICategoriesRepository
{
    Task<Category?> GetUserCategory(Guid id, Guid userId);

    Task<List<Category>> GetUserCategoriesAsync(Guid userId);

    Task InsertAsync(Category category);

    Task<bool> UpdateAsync(Guid id, string name, Guid iconId, Guid userId);

    Task DeleteUserCategoriesAsync(List<Guid> categoryIds, Guid userId);
}
