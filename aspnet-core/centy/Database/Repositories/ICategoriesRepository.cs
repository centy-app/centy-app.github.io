using centy.Domain.Categories;

namespace centy.Database.Repositories;

public interface ICategoriesRepository
{
    Task<List<Category>> GetAll();
    
    Task InsertAsync(Category category);

    Task DeleteAsync(List<Guid> categories);
}
