using centy.Domain.Categories;

namespace centy.Services.Categories;

public interface ICategoriesService
{
    Task<List<CategoryTree>> GetUserCategoriesAsync(Guid userId);

    List<CategoryTree> GetAllChildren(List<CategoryTree> categoryTree, Guid categoryId);

    Task CreateUserCategoryAsync(Guid parentId, CategoryType type, Guid iconId, string name, string currencyCode,
        Guid userId);

    Task UpdateUserCategoryAsync(Guid id, string name, Guid iconId, Guid userId);

    Task DeleteUserCategoryAsync(Guid categoryId, Guid userId);
}
