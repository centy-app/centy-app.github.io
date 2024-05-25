using centy.API.Contracts.Responses.Auth;
using centy.Domain.Services.Auth;

namespace centy.API.Endpoints.Auth;

[HttpGet("auth/aboutme")]
public class AboutMeEndpoint : EndpointWithoutRequest<AboutMeResponse>
{
    private readonly IUserService _userService;
    private readonly ILogger<AboutMeEndpoint> _logger;

    public AboutMeEndpoint(IUserService userService, ILogger<AboutMeEndpoint> logger)
    {
        _userService = userService;
        _logger = logger;
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        try
        {
            var user = await _userService.GetUserByNameAsync(HttpContext.User.Identity?.Name);
            var response = new AboutMeResponse
            {
                Id = user.Id,
                Email = user.Email,
                BaseCurrencyCode = user.BaseCurrencyCode
            };

            await SendOkAsync(response, ct);
        }
        catch (Exception ex)
        {
            _logger.LogError("About me failed with exception message: {Exception}", ex.Message);
            await SendUnauthorizedAsync(ct);
        }
    }
}
