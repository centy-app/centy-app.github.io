using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using FastEndpoints;
using centy.Contracts.Requests.Auth;
using centy.Domain.Auth;

namespace centy.Endpoints.Auth
{
    [HttpPost("users"), AllowAnonymous]
    public class RegisterUserEndpoint : Endpoint<RegisterUserRequest>
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;

        public RegisterUserEndpoint(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        public override async Task HandleAsync(RegisterUserRequest req, CancellationToken ct)
        {

            var user = new ApplicationUser()
            {
                UserName = req.Email,
                Email = req.Email,
            };

            var result = await userManager.CreateAsync(user, req.Password);

            if (result.Succeeded)
            {
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
