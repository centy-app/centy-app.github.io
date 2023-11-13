using Microsoft.AspNetCore.Authorization;
using centy.API.Contracts.Responses.Auth;
using centy.API.Contracts.Requests.Auth;
using centy.Domain.Services.Auth;

namespace centy.API.Endpoints.Auth;

[HttpPost("auth/login"), AllowAnonymous]
public class LoginEndpoint : Endpoint<LoginRequest, LoginResponse>
{
    private readonly IUserService _userService;
    private readonly IJwtService _jwtService;

    public LoginEndpoint(IUserService userService, IJwtService jwtService)
    {
        _userService = userService;
        _jwtService = jwtService;
    }

    public override async Task HandleAsync(LoginRequest req, CancellationToken ct)
    {
        var result = await _userService.LogInAsync(req.Email, req.Password);
        if (result.Succeeded)
        {
            var user = await _userService.GetUserByNameAsync(req.Email);
            if (user is null)
            {
                await SendUnauthorizedAsync(ct);
                return;
            }

            var jwtToken = _jwtService.CreateToken(user);

            var response = new LoginResponse
            {
                Email = user.Email,
                Token = jwtToken,
                BaseCurrencyCode = user.BaseCurrencyCode
            };

            await SendOkAsync(response, ct);
        }
        else
        {
            ThrowError("Username or Password is incorrect.");
        }
    }
}
