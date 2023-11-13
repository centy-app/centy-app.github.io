using System.Text;
using System.Globalization;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using centy.Domain.Services.Currencies;
using centy.Domain.ValueObjects.Auth;
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
        var expiration = DateTime.UtcNow.AddDays(7);
        var token = CreateJwtToken(
            CreateClaims(user),
            CreateSigningCredentials(),
            expiration
        );

        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.WriteToken(token);
    }

    private JwtSecurityToken CreateJwtToken(
        IEnumerable<Claim> claims,
        SigningCredentials credentials,
        DateTime expiration) => new(
        EnvironmentVariables.TokenIssuer,
        EnvironmentVariables.TokenAudience,
        claims,
        expires: expiration,
        signingCredentials: credentials
    );

    private IEnumerable<Claim> CreateClaims(ApplicationUser user)
    {
        try
        {
            if (string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.Email))
            {
                _logger.LogError("{UserId} name or email is not set", user.Id);
                throw new Exception("User should have name and email set.");
            }

            if (string.IsNullOrWhiteSpace(user.BaseCurrencyCode))
            {
                _logger.LogError("{User} base currency is not set", user.Email);
                throw new Exception("User should have base currency set.");
            }

            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, "Centy"),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString(CultureInfo.InvariantCulture)),
                new(ClaimTypes.Name, user.UserName),
                new(ClaimTypes.Email, user.Email),
                new("BaseCurrencyCode", user.BaseCurrencyCode)
            };

            return claims;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occur while generating the user claim: {Exception}", ex.Message);
            throw;
        }
    }

    private static SigningCredentials CreateSigningCredentials()
    {
        return new SigningCredentials(
            new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(EnvironmentVariables.TokenSigningKey)
            ),
            SecurityAlgorithms.HmacSha256
        );
    }
}
