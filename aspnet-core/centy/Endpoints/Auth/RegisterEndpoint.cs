using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using FastEndpoints;
using centy.Contracts.Requests.Auth;
using centy.Domain.Auth;
using Microsoft.Extensions.Logging;

namespace centy.Endpoints.Auth
{
    [HttpPost("auth/register"), AllowAnonymous]
    public class RegisterEndpoint : Endpoint<RegisterRequest>
    {
        private readonly ILogger<RegisterEndpoint> logger;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;

        public RegisterEndpoint(ILogger<RegisterEndpoint> logger, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            this.logger = logger;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        public override async Task HandleAsync(RegisterRequest req, CancellationToken ct)
        {
            var user = new ApplicationUser()
            {
                UserName = req.Email,
                Email = req.Email,
            };

            var result = await userManager.CreateAsync(user, req.Password);

            if (result.Succeeded)
            {
                logger.LogInformation("{email} successfully registered.", req.Email);

                await signInManager.SignInAsync(user, isPersistent: false);
                await SendOkAsync(ct);
            }
            else
            {
                foreach (var error in result.Errors)
                {
                    AddError(error.Description ?? "An unknown error occurred.");
                }
            }

            ThrowIfAnyErrors();
        }
    }
}
