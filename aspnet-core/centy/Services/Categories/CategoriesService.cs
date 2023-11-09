using centy.Database.Repositories;
using centy.Domain.Categories;

namespace centy.Services.Categories;

public class CategoriesService : ICategoriesService
{
    private readonly ICategoriesRepository _categoriesRepository;
    private readonly ILogger<CategoriesService> _logger;

    public CategoriesService(ICategoriesRepository repository, ILogger<CategoriesService> logger)
    {
        _categoriesRepository = repository;
        _logger = logger;
    }
    
    public async Task<List<Category>> GetCategoriesAsync()
    {
        return await _categoriesRepository.GetAll();
    }
    
    public async Task CreateCategoryAsync(Category category)
    {
        await _categoriesRepository.InsertAsync(category);
    }

    public async Task DeleteCategoriesAsync(List<Guid> categories)
    {
        await _categoriesRepository.DeleteAsync(categories);
    }
}
