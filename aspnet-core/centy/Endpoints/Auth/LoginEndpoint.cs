using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using centy.Contracts.Requests.Auth;
using centy.Contracts.Responses.Auth;
using centy.Domain.Auth;
using centy.Services.Auth;

namespace centy.Endpoints.Auth;

[HttpPost("auth/login"), AllowAnonymous]
public class LoginEndpoint : Endpoint<LoginRequest, LoginResponse>
{
    private readonly ILogger<LoginEndpoint> _logger;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IJwtService _jwtService;

    public LoginEndpoint(
        ILogger<LoginEndpoint> logger,
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        IJwtService jwtService)
    {
        _logger = logger;
        _userManager = userManager;
        _signInManager = signInManager;
        _jwtService = jwtService;
    }

    public override async Task HandleAsync(LoginRequest req, CancellationToken ct)
    {
        var result = await _signInManager.PasswordSignInAsync(req.Email, req.Password, true, false);

        if (result.Succeeded)
        {
            var user = await _userManager.FindByEmailAsync(req.Email);

            var jwtToken = _jwtService.CreateToken(user);
            var response = new LoginResponse
            {
                Email = user.Email,
                Token = jwtToken,
                BaseCurrencyCode = user.BaseCurrencyCode
            };

            _logger.LogInformation("{Email} successfully logged in", req.Email);

            await SendAsync(response, 200, ct);
            return;
        }

        AddError("Username or Password is incorrect.");
        ThrowIfAnyErrors();
    }
}
