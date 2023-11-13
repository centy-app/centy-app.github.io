namespace centy.API.Contracts.Requests.Categories;

public record DeleteCategoryRequest
{
    public Guid Id { get; init; }
}
