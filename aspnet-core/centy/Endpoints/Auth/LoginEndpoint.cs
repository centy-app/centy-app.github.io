using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using FastEndpoints;
using centy.Contracts.Requests.Auth;
using centy.Contracts.Responses.Auth;
using centy.Domain.Auth;
using centy.Services.Auth;

namespace centy.Endpoints.Auth
{
    [HttpPost("auth/login"), AllowAnonymous]
    public class LoginEndpoint : Endpoint<LoginRequest, LoginResponse>
    {
        private readonly ILogger<LoginEndpoint> logger;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;

        public LoginEndpoint(ILogger<LoginEndpoint> logger, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            this.logger = logger;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        public override async Task HandleAsync(LoginRequest req, CancellationToken ct)
        {
            var result = await signInManager.PasswordSignInAsync(req.Email, req.Password, true, false);

            if (result.Succeeded)
            {
                var user = await userManager.FindByEmailAsync(req.Email);

                var jwtToken = JwtService.CreateToken(user);
                var response = new LoginResponse
                {
                    Email = user.Email,
                    Token = jwtToken
                };

                logger.LogInformation("{email} successfully logged in.", req.Email);

                await SendAsync(response, 200, ct);
            }
            else
            {
                AddError("Username or Password is incorrect.");
            }

            ThrowIfAnyErrors();
        }
    }
}
