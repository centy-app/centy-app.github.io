using centy.Contracts.Requests.Categories;
using centy.Services.Categories;
using centy.Domain.Categories;
using centy.Services.Auth;

namespace centy.Endpoints.Categories;

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
        var newCategory = new Category
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            ParentId = req.ParentId,
            Name = req.Name,
            Type = req.Type,
            Icon = req.Icon,
            CurrencyCode = req.CurrencyCode?.ToUpperInvariant()
        };

        await _categoriesService.CreateCategoryAsync(newCategory);

        await SendOkAsync(ct);
    }
}
