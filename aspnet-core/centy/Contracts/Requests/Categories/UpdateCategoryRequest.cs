namespace centy.Contracts.Requests.Categories;

public record UpdateCategoryRequest
{
    public Guid Id { get; init; }
    public Guid IconId { get; init; }
    public string? Name { get; init; }
}
