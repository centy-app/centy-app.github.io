using centy.Contracts.Requests.Categories;
using centy.Services.Categories;
using centy.Services.Auth;

namespace centy.Endpoints.Categories;

[HttpPatch("categories")]
public class PatchCategoryEndpoint : Endpoint<UpdateCategoryRequest>
{
    private readonly ICategoriesService _categoriesService;
    private readonly IUserService _userService;

    public PatchCategoryEndpoint(ICategoriesService categoriesService, IUserService userService)
    {
        _categoriesService = categoriesService;
        _userService = userService;
    }

    public override async Task HandleAsync(UpdateCategoryRequest req, CancellationToken ct)
    {
        var user = await _userService.GetUserByNameAsync(HttpContext.User.Identity?.Name);

        var updated = await _categoriesService.UpdateUserCategoryAsync(req.Id, req.Name, req.IconId, user.Id);
        if (updated)
        {
            await SendOkAsync(ct);
        }
        else
        {
            AddError("Category not updated");
        }

        await SendErrorsAsync(400, ct);
    }
}
