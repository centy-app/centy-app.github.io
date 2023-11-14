using centy.API.Contracts.Requests.Categories;
using centy.Domain.Services.Categories;
using centy.Domain.Services.Auth;

namespace centy.API.Endpoints.Categories;

[HttpPatch("categories")]
public class PatchCategoryEndpoint : Endpoint<UpdateCategoryRequest>
{
    private readonly ICategoriesService _categoriesService;
    private readonly ILogger<PatchCategoryEndpoint> _logger;
    private readonly IUserService _userService;

    public PatchCategoryEndpoint(
        ILogger<PatchCategoryEndpoint> logger,
        ICategoriesService categoriesService,
        IUserService userService)
    {
        _categoriesService = categoriesService;
        _userService = userService;
        _logger = logger;
    }

    public override async Task HandleAsync(UpdateCategoryRequest req, CancellationToken ct)
    {
        try
        {
            var user = await _userService.GetUserByNameAsync(HttpContext.User.Identity?.Name);
            var updated = await _categoriesService.UpdateUserCategoryAsync(req.Id, req.Name, req.IconId, user.Id);
            if (updated)
            {
                await SendOkAsync(ct);
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning("Category {Category} not updated, error message: {Exception}", req.Id, ex.Message);
            ThrowError("Category could not be updated.");
        }
    }
}
