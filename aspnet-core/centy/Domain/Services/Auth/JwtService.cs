using System.Security.Claims;
using FastEndpoints.Security;
using centy.Domain.Entities.Auth;
using centy.Infrastructure;

namespace centy.Domain.Services.Auth;

public class JwtService : IJwtService
{
    private readonly ILogger<JwtService> _logger;

    public JwtService(ILogger<JwtService> logger)
    {
        _logger = logger;
    }

    public string CreateToken(ApplicationUser user)
    {
        if (string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.Email))
        {
            _logger.LogError("{UserId} name or email is not set", user.Id);
            throw new Exception("User should have name and email set.");
        }

        var claims = new List<Claim>
        {
            new(ClaimTypes.Name, user.UserName),
            new(ClaimTypes.Email, user.Email)
        };
        
        var jwtToken = JwtBearer.CreateToken(
            o =>
            {
                o.SigningKey = EnvironmentVariables.TokenSigningKey;
                o.ExpireAt = DateTime.UtcNow.AddDays(2);
                o.User.Claims.AddRange(claims);
                o.User["UserId"] = user.Id.ToString();
            });

        return jwtToken;
    }
}
