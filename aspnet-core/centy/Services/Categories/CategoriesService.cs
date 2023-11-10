using centy.Database.Repositories;
using centy.Domain.Categories;

namespace centy.Services.Categories;

public class CategoriesService : ICategoriesService
{
    private readonly ICategoriesRepository _categoriesRepository;

    public CategoriesService(ICategoriesRepository repository)
    {
        _categoriesRepository = repository;
    }

    public async Task<List<Category>> GetUserCategoriesAsync(Guid userId)
    {
        return await _categoriesRepository.GetUserCategoriesAsync(userId);
    }

    public async Task CreateCategoryAsync(Category category)
    {
        await _categoriesRepository.InsertAsync(category);
    }

    public async Task DeleteCategoriesAsync(List<Guid> categoryIds, Guid userId)
    {
        await _categoriesRepository.DeleteUserCategoriesAsync(categoryIds, userId);
    }
}
