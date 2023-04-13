using Microsoft.AspNetCore.Identity;
using FastEndpoints;
using centy.Domain.Auth;
using Microsoft.AspNetCore.Authorization;

namespace centy.Endpoints.Auth
{
    [HttpPost("auth/logout")]
    public class LogoutEndpoint : EndpointWithoutRequest
    {
        private readonly SignInManager<ApplicationUser> signInManager;

        public LogoutEndpoint(SignInManager<ApplicationUser> signInManager)
        {
            this.signInManager = signInManager;
        }

        public override async Task HandleAsync(CancellationToken ct)
        {
            await signInManager.SignOutAsync();

            await SendOkAsync(ct);
        }
    }
}
