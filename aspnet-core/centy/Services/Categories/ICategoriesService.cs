using centy.Domain.Categories;

namespace centy.Services.Categories;

public interface ICategoriesService
{
    Task<List<Category>> GetCategoriesAsync();
    
    Task CreateCategoryAsync(Category category);

    Task DeleteCategoriesAsync(List<Guid> categories);
}
