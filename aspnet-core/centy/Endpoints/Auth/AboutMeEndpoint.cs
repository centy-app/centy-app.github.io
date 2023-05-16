using Microsoft.AspNetCore.Identity;
using centy.Contracts.Responses.Auth;
using centy.Domain.Auth;

namespace centy.Endpoints.Auth;

[HttpGet("auth/aboutme")]
public class AboutMeEndpoint : EndpointWithoutRequest<AboutMeResponse>
{
    private readonly UserManager<ApplicationUser> _userManager;

    public AboutMeEndpoint(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var user = await _userManager.FindByNameAsync(HttpContext?.User?.Identity?.Name);
        var response = new AboutMeResponse
        {
            Id = user.Id,
            Email = user.Email,
            BaseCurrencyCode = user.BaseCurrencyCode
        };

        await SendOkAsync(response, ct);
    }
}
