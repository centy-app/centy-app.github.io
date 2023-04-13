using Microsoft.AspNetCore.Identity;
using FastEndpoints;
using centy.Contracts.Responses.Auth;
using centy.Domain.Auth;

namespace centy.Endpoints.Auth
{
    [HttpGet("auth/aboutme")]
    public class AboutMeEndpoint : EndpointWithoutRequest<AboutMeResponse>
    {
        private readonly UserManager<ApplicationUser> userManager;

        public AboutMeEndpoint(UserManager<ApplicationUser> userManager)
        {
            this.userManager = userManager;
        }

        public override async Task HandleAsync(CancellationToken ct)
        {
            var user = await userManager.FindByNameAsync(HttpContext?.User?.Identity?.Name);
            var response = new AboutMeResponse()
            {
                Id = user.Id,
                Email = user.Email
            };

            await SendOkAsync(response, ct);
        }
    }
}
