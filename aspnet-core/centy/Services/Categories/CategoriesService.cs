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

    public async Task<List<CategoryTree>> GetUserCategoriesAsync(Guid userId)
    {
        var categories = await _categoriesRepository.GetUserCategoriesAsync(userId);
        var categoryTree = BuildCategoryTree(categories);

        return categoryTree;
    }

    public async Task CreateUserCategoryAsync(Guid parentId, CategoryType type, string icon, string name,
        string currencyCode, Guid userId)
    {
        var newCategory = new Category
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            ParentId = parentId,
            Name = name,
            Type = type,
            Icon = icon,
            CurrencyCode = currencyCode.ToUpperInvariant()
        };

        await _categoriesRepository.InsertAsync(newCategory);
    }

    public async Task UpdateUserCategoryAsync(Guid id, string name, string icon, Guid userId)
    {
        await _categoriesRepository.UpdateAsync(id, name, icon, userId);
    }

    public async Task DeleteUserCategoryAsync(Guid categoryId, Guid userId)
    {
        var categories = await _categoriesRepository.GetUserCategoriesAsync(userId);
        var categoryTree = BuildCategoryTree(categories);
        var childrenToDelete = GetAllChildren(categoryTree, categoryId);

        var childrenIdsToDelete = childrenToDelete.Select(c => c.Id).ToList();
        childrenIdsToDelete.Add(categoryId);

        await _categoriesRepository.DeleteUserCategoriesAsync(childrenIdsToDelete, userId);
    }

    private List<CategoryTree> BuildCategoryTree(List<Category> categories)
    {
        var categoryLookup = categories.ToLookup(cat => cat.ParentId);
        var rootCategories = categoryLookup[Guid.Empty];
        var categoryTree = rootCategories.Select(cat => BuildCategoryTreeRecursive(cat, categoryLookup)).ToList();

        return categoryTree;
    }

    private CategoryTree BuildCategoryTreeRecursive(Category category, ILookup<Guid, Category> categoryLookup)
    {
        var categoryTree = new CategoryTree
        {
            Id = category.Id,
            UserId = category.UserId,
            Type = category.Type,
            Icon = category.Icon,
            Name = category.Name,
            CurrencyCode = category.CurrencyCode,
        };

        var children = categoryLookup[category.Id].Select(child => BuildCategoryTreeRecursive(child, categoryLookup))
            .ToList();

        if (children.Any())
        {
            categoryTree.Children = children;
        }

        return categoryTree;
    }

    public List<CategoryTree> GetAllChildren(List<CategoryTree> categoryTree, Guid categoryId)
    {
        var result = new List<CategoryTree>();
        FindChildren(categoryTree, categoryId, result);
        return result;
    }

    private void FindChildren(List<CategoryTree> categoryTree, Guid categoryId, List<CategoryTree> result)
    {
        foreach (var category in categoryTree)
        {
            if (category.Id == categoryId)
            {
                // Found the category, add its children
                if (category.Children != null)
                {
                    result.AddRange(category.Children);
                }

                return;
            }

            // Recursively search in children
            if (category.Children != null)
            {
                FindChildren(category.Children, categoryId, result);
            }
        }
    }
}
