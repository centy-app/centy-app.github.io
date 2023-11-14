using Microsoft.AspNetCore.Authorization;
using centy.API.Contracts.Requests.Auth;
using centy.Domain.Services.Auth;

namespace centy.API.Endpoints.Auth;

[HttpPost("auth/register"), AllowAnonymous]
public class RegisterEndpoint : Endpoint<RegisterRequest>
{
    private readonly IUserService _userService;
    private readonly ILogger<RegisterEndpoint> _logger;

    public RegisterEndpoint(IUserService userService, ILogger<RegisterEndpoint> logger)
    {
        _userService = userService;
        _logger = logger;
    }

    public override async Task HandleAsync(RegisterRequest req, CancellationToken ct)
    {
        var result = await _userService.RegisterAsync(req.Email, req.Password, req.BaseCurrencyCode);

        if (result.Succeeded)
        {
            _logger.LogInformation("{Email} successfully registered", req.Email);
            await SendOkAsync(ct);
        }
        else if (result.Errors.Any())
        {
            foreach (var error in result.Errors)
            {
                AddError(error.Description);
            }
        }
        else
        {
            AddError("An unknown error occurred while registering the new user.");
        }

        ThrowIfAnyErrors();
    }
}
