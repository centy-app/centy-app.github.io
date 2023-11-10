using centy.Domain.Categories;

namespace centy.Contracts.Requests.Categories;

public record CreateCategoryRequest
{
    public Guid ParentId { get; init; }
    public CategoryType Type { get; init; }
    public string? Icon { get; init; }
    public string? Name { get; init; }
    public string? CurrencyCode { get; init; }
}
