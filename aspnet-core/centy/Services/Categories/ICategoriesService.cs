using centy.Domain.Categories;

namespace centy.Services.Categories;

public interface ICategoriesService
{
    Task<List<Category>> GetUserCategoriesAsync(Guid userId);
    
    Task CreateCategoryAsync(Category category);

    Task DeleteCategoriesAsync(List<Guid> categoryIds, Guid userId);
}
