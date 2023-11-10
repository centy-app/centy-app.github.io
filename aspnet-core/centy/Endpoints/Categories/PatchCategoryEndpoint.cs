using centy.Contracts.Requests.Categories;
using centy.Services.Auth;
using centy.Services.Categories;

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

        if (req.Name is not null && req.Icon is not null)
        {
            await _categoriesService.UpdateUserCategoryAsync(req.Id, req.Name, req.Icon, user.Id);

            await SendOkAsync(ct);
        }

        AddError("Please ensure all field are filled in");
        await SendErrorsAsync(400, ct);
    }
}
