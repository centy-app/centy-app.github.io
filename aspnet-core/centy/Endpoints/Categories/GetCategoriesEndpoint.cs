using centy.Domain.Auth;
using centy.Services.Categories;
using centy.Domain.Categories;
using Microsoft.AspNetCore.Identity;

namespace centy.Endpoints.Categories;

[HttpGet("categories")]
public class GetCategoriesEndpoint : EndpointWithoutRequest<List<Category>>
{
    private readonly ICategoriesService _categoriesService;
    private readonly UserManager<ApplicationUser> _userManager;

    public GetCategoriesEndpoint(ICategoriesService categoriesService, UserManager<ApplicationUser> userManager)
    {
        _categoriesService = categoriesService;
        _userManager = userManager;
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var user = await _userManager.FindByNameAsync(HttpContext.User.Identity?.Name);
        var result = await _categoriesService.GetUserCategoriesAsync(user.Id);

        await SendOkAsync(result, ct);
    }
}
