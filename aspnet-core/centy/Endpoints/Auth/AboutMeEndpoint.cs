using centy.Contracts.Responses.Auth;
using centy.Services.Auth;

namespace centy.Endpoints.Auth;

[HttpGet("auth/aboutme")]
public class AboutMeEndpoint : EndpointWithoutRequest<AboutMeResponse>
{
    private readonly IUserService _userService;

    public AboutMeEndpoint(IUserService userService)
    {
        _userService = userService;
    }

    public override async Task HandleAsync(CancellationToken ct)
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
}
