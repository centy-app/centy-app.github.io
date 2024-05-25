using centy.Domain.Entities.Categories;
using centy.Domain.Services.Categories;
using centy.Domain.Services.Auth;

namespace centy.API.Endpoints.Categories;

[HttpGet("categories")]
public class GetCategoriesEndpoint : EndpointWithoutRequest<List<CategoryTree>>
{
    private readonly ILogger<GetCategoriesEndpoint> _logger;
    private readonly ICategoriesService _categoriesService;
    private readonly IUserService _userService;

    public GetCategoriesEndpoint(
        ILogger<GetCategoriesEndpoint> logger,
        ICategoriesService categoriesService,
        IUserService userService)
    {
        _logger = logger;
        _categoriesService = categoriesService;
        _userService = userService;
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var userId = Guid.Empty;
        try
        {
            var user = await _userService.GetUserByNameAsync(HttpContext.User.Identity?.Name);
            userId = user.Id;
            var result = await _categoriesService.GetUserCategoriesAsync(user.Id);
            await SendOkAsync(result, ct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Get categories failed for user {User} with exception message: {Exception}", userId, ex.Message);
            ThrowError("Categories could not be retrieved.");
        }
    }
}
