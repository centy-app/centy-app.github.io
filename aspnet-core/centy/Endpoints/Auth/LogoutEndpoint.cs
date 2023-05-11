using Microsoft.AspNetCore.Identity;
using FastEndpoints;
using centy.Domain.Auth;

namespace centy.Endpoints.Auth;

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
