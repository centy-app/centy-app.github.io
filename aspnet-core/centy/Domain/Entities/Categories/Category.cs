namespace centy.Domain.Entities.Categories;

public record Category
{
    public Guid Id { get; init; }
    public Guid ParentId { get; init; }
    public Guid UserId { get; init; }
    public CategoryType Type { get; init; }
    public Guid IconId { get; init; }
    public string? Name { get; init; }
    public string? CurrencyCode { get; init; }
}
