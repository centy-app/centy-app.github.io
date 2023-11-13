﻿using centy.API.Contracts.Responses.Auth;
using centy.Domain.Services.Auth;

namespace centy.API.Endpoints.Auth;

[HttpGet("auth/aboutme")]
public class AboutMeEndpoint : EndpointWithoutRequest<AboutMeResponse>
{
    private readonly IUserService _userService;

    public AboutMeEndpoint(IUserService userService)
    {
        _userService = userService;
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var user = await _userService.GetUserByNameAsync(HttpContext.User.Identity?.Name);

        if (user is null)
        {
            await SendUnauthorizedAsync(ct);
            return;
        }

        var response = new AboutMeResponse
        {
            Id = user.Id,
            Email = user.Email,
            BaseCurrencyCode = user.BaseCurrencyCode
        };

        await SendOkAsync(response, ct);
    }
}