using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using centy.Contracts.Requests.Auth;
using centy.Domain.Auth;

namespace centy.Endpoints.Auth;

[HttpPost("auth/register"), AllowAnonymous]
public class RegisterEndpoint : Endpoint<RegisterRequest>
{
    private readonly ILogger<RegisterEndpoint> _logger;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;

    public RegisterEndpoint(
        ILogger<RegisterEndpoint> logger,
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager)
    {
        _logger = logger;
        _userManager = userManager;
        _signInManager = signInManager;
    }

    public override async Task HandleAsync(RegisterRequest req, CancellationToken ct)
    {
        var user = new ApplicationUser
        {
            UserName = req.Email,
            Email = req.Email,
            BaseCurrencyCode = req.BaseCurrencyCode
        };

        var result = await _userManager.CreateAsync(user, req.Password);

        if (result.Succeeded)
        {
            _logger.LogInformation("{Email} successfully registered", req.Email);

            await _signInManager.SignInAsync(user, isPersistent: false);
            await SendOkAsync(ct);
            return;
        }

        if (result.Errors.Any())
        {
            foreach (var error in result.Errors)
            {
                AddError(error.Description);
            }
        }
        else
        {
            AddError("An unknown error occurred.");
        }

        ThrowIfAnyErrors();
    }
}
