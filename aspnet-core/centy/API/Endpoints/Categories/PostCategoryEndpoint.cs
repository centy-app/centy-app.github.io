using centy.API.Contracts.Requests.Categories;
using centy.Domain.Services.Categories;
using centy.Domain.Services.Auth;

namespace centy.API.Endpoints.Categories;

[HttpPost("categories")]
public class PostCategoryEndpoint : Endpoint<CreateCategoryRequest>
{
    private readonly ILogger<PostCategoryEndpoint> _logger;
    private readonly ICategoriesService _categoriesService;
    private readonly IUserService _userService;

    public PostCategoryEndpoint(
        ILogger<PostCategoryEndpoint> logger,
        ICategoriesService categoriesService,
        IUserService userService)
    {
        _logger = logger;
        _categoriesService = categoriesService;
        _userService = userService;
    }

    public override async Task HandleAsync(CreateCategoryRequest req, CancellationToken ct)
    {
        var userId = Guid.Empty;
        try
        {
            var user = await _userService.GetUserByNameAsync(HttpContext.User.Identity?.Name);
            userId = user.Id;

            await _categoriesService.CreateUserCategoryAsync(
                req.ParentId, req.Type, req.IconId, req.Name,
                req.CurrencyCode, user);

            await SendOkAsync(ct);
        }
        catch (Exception ex)
        {
            _logger.LogWarning("Category not saved for user: {User}, error message: {Exception}", userId, ex.Message);
            ThrowError("Category could not be saved.");
        }
    }
}
