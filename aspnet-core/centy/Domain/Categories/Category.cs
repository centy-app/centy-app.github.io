namespace centy.Domain.Categories;

public class Category
{
    public Guid Id { get; init; }
    public Guid ParentId { get; init; }
    public Guid UserId { get; init; }
    public CategoryType Type { get; init; }
    public string? Icon { get; init; }
    public string? Name { get; init; }
    public string? CurrencyCode { get; init; }
}
