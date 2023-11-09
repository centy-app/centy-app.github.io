using centy.Domain.Categories;

namespace centy.Contracts.Requests.Categories;

public class CreateCategoryRequest
{
    public Guid ParentId { get; set; }

    public CategoryType Type { get; set; }

    public string Icon { get; set; } = "";

    public string Name { get; set; } = "";

    public string CurrencyCode { get; set; } = "";
}
