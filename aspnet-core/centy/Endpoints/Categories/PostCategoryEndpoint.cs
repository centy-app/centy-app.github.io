using Microsoft.AspNetCore.Identity;
using centy.Contracts.Requests.Categories;
using centy.Services.Categories;
using centy.Domain.Categories;
using centy.Domain.Auth;

namespace centy.Endpoints.Categories;

[HttpPost("categories")]
public class PostCategoryEndpoint : Endpoint<CreateCategoryRequest>
{
    private readonly ICategoriesService _categoriesService;
    private readonly UserManager<ApplicationUser> _userManager;

    public PostCategoryEndpoint(ICategoriesService categoriesService, UserManager<ApplicationUser> userManager)
    {
        _categoriesService = categoriesService;
        _userManager = userManager;
    }

    public override async Task HandleAsync(CreateCategoryRequest req, CancellationToken ct)
    {
        var user = await _userManager.FindByNameAsync(HttpContext.User.Identity?.Name);
        var newCategory = new Category
        {
            Id = new Guid(),
            UserId = user.Id,
            ParentId = req.ParentId,
            Name = req.Name,
            Type = req.Type,
            Icon = req.Icon,
            CurrencyCode = req.CurrencyCode
        };

        await _categoriesService.CreateCategoryAsync(newCategory);

        await SendOkAsync(ct);
    }
}
