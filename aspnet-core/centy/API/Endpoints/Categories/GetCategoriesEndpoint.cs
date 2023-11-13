using centy.Domain.ValueObjects.Categories;
using centy.Domain.Services.Categories;
using centy.Domain.Services.Auth;

namespace centy.API.Endpoints.Categories;

[HttpGet("categories")]
public class GetCategoriesEndpoint : EndpointWithoutRequest<List<CategoryTree>>
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
        if (user is null)
        {
            await SendUnauthorizedAsync(ct);
            return;
        }

        var result = await _categoriesService.GetUserCategoriesAsync(user.Id);

        await SendOkAsync(result, ct);
    }
}
