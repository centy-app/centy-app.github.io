namespace centy.Contracts.Requests.Categories;

public record UpdateCategoryRequest
{
    public Guid Id { get; init; }
    public string? Icon { get; init; }
    public string? Name { get; init; }
}
