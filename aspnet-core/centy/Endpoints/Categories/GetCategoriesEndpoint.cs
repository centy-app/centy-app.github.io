using centy.Services.Categories;
using centy.Domain.Categories;
using centy.Services.Auth;

namespace centy.Endpoints.Categories;

[HttpGet("categories")]
public class GetCategoriesEndpoint : EndpointWithoutRequest<List<Category>>
{
    private readonly ICategoriesService _categoriesService;
    private readonly IUserService _userService;

    public GetCategoriesEndpoint(ICategoriesService categoriesService, IUserService userService)
    {
        _categoriesService = categoriesService;
        _userService = userService;
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var user = await _userService.GetUserByNameAsync(HttpContext.User.Identity?.Name);
        var result = await _categoriesService.GetUserCategoriesAsync(user.Id);

        await SendOkAsync(result, ct);
    }
}
