using centy.Domain.Categories;

namespace centy.Database.Repositories;

public interface ICategoriesRepository
{
    Task<List<Category>> GetUserCategoriesAsync(Guid userId);

    Task InsertAsync(Category category);

    Task<bool> UpdateAsync(Guid id, string name, string icon, Guid userId);

    Task DeleteUserCategoriesAsync(List<Guid> categoryIds, Guid userId);
}
