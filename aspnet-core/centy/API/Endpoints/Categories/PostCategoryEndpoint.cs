using centy.API.Contracts.Requests.Categories;
using centy.Domain.Services.Categories;
using centy.Domain.Services.Auth;

namespace centy.API.Endpoints.Categories;

[HttpPost("categories")]
public class PostCategoryEndpoint : Endpoint<CreateCategoryRequest>
{
    private readonly ICategoriesService _categoriesService;
    private readonly IUserService _userService;

    public PostCategoryEndpoint(ICategoriesService categoriesService, IUserService userService)
    {
        _categoriesService = categoriesService;
        _userService = userService;
    }

    public override async Task HandleAsync(CreateCategoryRequest req, CancellationToken ct)
    {
        var user = await _userService.GetUserByNameAsync(HttpContext.User.Identity?.Name);

        try
        {
            await _categoriesService.CreateUserCategoryAsync(
                req.ParentId, req.Type, req.IconId, req.Name,
                req.CurrencyCode, user);

            await SendOkAsync(ct);
        }
        catch (Exception ex)
        {
            //TODO: Catch application known exceptions here, pass generic text for generic exception
            ThrowError(ex.Message);
        }
    }
}
