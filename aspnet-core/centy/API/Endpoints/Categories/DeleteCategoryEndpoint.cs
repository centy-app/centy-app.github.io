﻿using centy.API.Contracts.Requests.Categories;
using centy.Domain.Services.Categories;
using centy.Domain.Services.Auth;

namespace centy.API.Endpoints.Categories;

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
            _logger.LogError(ex, "User category {Category} delete failed with message {Message}", req.Id, ex.Message);
            ThrowError("Category could not be deleted.");
        }
    }
}
