using centy.Services.Categories;
using centy.Domain.Categories;

namespace centy.Endpoints.Categories;

[HttpGet("categories")]
public class GetCategoriesEndpoint : EndpointWithoutRequest<List<Category>>
{
    private readonly ICategoriesService _categoriesService;

    public GetCategoriesEndpoint(ICategoriesService categoriesService)
    {
        _categoriesService = categoriesService;
    }
    
    public override async Task HandleAsync(CancellationToken ct)
    {
        var result = await _categoriesService.GetCategoriesAsync();

        await SendOkAsync(result, ct);
    }
}
