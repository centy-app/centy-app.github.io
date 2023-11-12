using centy.Contracts.Requests.Categories;
using centy.Services.Categories;
using centy.Services.Auth;

namespace centy.Endpoints.Categories;

[HttpDelete("categories/{id}")]
public class DeleteCategoryEndpoint : Endpoint<DeleteCategoryRequest>
{
    private readonly ICategoriesService _categoriesService;
    private readonly ILogger<DeleteCategoryEndpoint> _logger;
    private readonly IUserService _userService;

    public DeleteCategoryEndpoint(
        ILogger<DeleteCategoryEndpoint> logger,
        ICategoriesService categoriesService,
        IUserService userService)
    {
        _categoriesService = categoriesService;
        _userService = userService;
        _logger = logger;
    }

    public override async Task HandleAsync(DeleteCategoryRequest req, CancellationToken ct)
    {
        try
        {
            var user = await _userService.GetUserByNameAsync(HttpContext.User.Identity?.Name);
            await _categoriesService.DeleteUserCategoryAsync(req.Id, user.Id);

            await SendOkAsync(ct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "DeleteUserCategory failed with message {Message}", ex.Message);
            ThrowError("Category not deleted");
        }
    }
}
