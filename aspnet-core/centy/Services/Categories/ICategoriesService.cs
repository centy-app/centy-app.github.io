using centy.Domain.Categories;

namespace centy.Services.Categories;

public interface ICategoriesService
{
    Task<List<CategoryTree>> GetUserCategoriesAsync(Guid userId);

    Task CreateUserCategoryAsync(Guid parentId, CategoryType type, string icon, string name, string currencyCode,
        Guid userId);

    Task UpdateUserCategoryAsync(Guid id, string name, string icon, Guid userId);

    Task DeleteUserCategoryAsync(Guid categoryId, Guid userId);
}
