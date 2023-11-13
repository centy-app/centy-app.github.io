using Microsoft.AspNetCore.Identity;
using centy.Domain.ValueObjects.Auth;

namespace centy.API.Endpoints.Auth;

[HttpPost("auth/logout")]
public class LogoutEndpoint : EndpointWithoutRequest
{
    private readonly SignInManager<ApplicationUser> _signInManager;

    public LogoutEndpoint(SignInManager<ApplicationUser> signInManager)
    {
        _signInManager = signInManager;
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        await _signInManager.SignOutAsync();
        await SendOkAsync(ct);
    }
}
