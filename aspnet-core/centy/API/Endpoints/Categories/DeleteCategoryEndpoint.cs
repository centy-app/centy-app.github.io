using centy.Domain.Services.Categories;
using centy.Domain.Services.Auth;

namespace centy.API.Endpoints.Categories;

[HttpDelete("categories/{id}")]
public class DeleteCategoryEndpoint : EndpointWithoutRequest
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

    public override async Task HandleAsync(CancellationToken ct)
    {
        var categoryId = Route<Guid>("id");
        try
        {
            var user = await _userService.GetUserByNameAsync(HttpContext.User.Identity?.Name);
            await _categoriesService.DeleteUserCategoryAsync(categoryId, user.Id);
            await SendOkAsync(ct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "User category {Category} delete failed with exception message: {Exception}", categoryId, ex.Message);
            ThrowError("Category could not be deleted.");
        }
    }
}
