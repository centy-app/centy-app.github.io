namespace centy.Domain.Categories;

public record CategoryTree
{
    public Guid Id { get; init; }
    public List<CategoryTree>? Children { get; set; }
    public Guid UserId { get; init; }
    public CategoryType Type { get; init; }
    public string? Icon { get; init; }
    public string? Name { get; init; }
    public string? CurrencyCode { get; init; }
}
