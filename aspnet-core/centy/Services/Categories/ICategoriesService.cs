using centy.Domain.Categories;
using centy.Domain.Auth;

namespace centy.Services.Categories;

public interface ICategoriesService
{
    Task<List<CategoryTree>> GetUserCategoriesAsync(Guid userId);

    List<CategoryTree> GetAllChildren(List<CategoryTree> categoryTree, Guid categoryId);

    Task CreateUserCategoryAsync(Guid parentId, CategoryType type, Guid iconId,
        string? name, string? currencyCode, ApplicationUser user);

    Task<bool> UpdateUserCategoryAsync(Guid id, string? name, Guid iconId, Guid userId);

    Task DeleteUserCategoryAsync(Guid categoryId, Guid userId);
}
