﻿using centy.Contracts.Requests.Categories;
using centy.Services.Categories;
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

        if (req.Name is not null && req.CurrencyCode is not null)
        {
            await _categoriesService.CreateUserCategoryAsync(
                req.ParentId, req.Type, req.IconId, req.Name,
                req.CurrencyCode, user);

            await SendOkAsync(ct);
            return;
        }


        AddError("Please ensure all field are filled in");
        await SendErrorsAsync(400, ct);
    }
}