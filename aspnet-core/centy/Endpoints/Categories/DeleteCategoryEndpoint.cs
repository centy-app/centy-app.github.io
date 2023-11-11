using centy.Contracts.Requests.Categories;
using centy.Services.Categories;
using centy.Services.Auth;

namespace centy.Endpoints.Categories;

[HttpDelete("categories/{id}")]
public class DeleteCategoryEndpoint : Endpoint<DeleteCategoryRequest>
{
    private readonly ICategoriesService _categoriesService;
    private readonly IUserService _userService;

    public DeleteCategoryEndpoint(ICategoriesService categoriesService, IUserService userService)
    {
        _categoriesService = categoriesService;
        _userService = userService;
    }

    public override async Task HandleAsync(DeleteCategoryRequest req, CancellationToken ct)
    {
        var user = await _userService.GetUserByNameAsync(HttpContext.User.Identity?.Name);
        await _categoriesService.DeleteUserCategoryAsync(req.Id, user.Id);

        await SendOkAsync(ct);
    }
}
