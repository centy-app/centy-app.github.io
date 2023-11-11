using System.Text;
using System.Globalization;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using centy.Services.Currencies;
using centy.Infrastructure;
using centy.Domain.Auth;

namespace centy.Services.Auth;

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
            if (string.IsNullOrWhiteSpace(user.BaseCurrencyCode))
            {
                _logger.LogWarning("{User} base currency is not set", user.Email);
            }

            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, "Centy"),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString(CultureInfo.InvariantCulture)),
                new(ClaimTypes.Name, user.UserName),
                new(ClaimTypes.Email, user.Email),
                new("BaseCurrencyCode", user.BaseCurrencyCode ?? CurrenciesService.BaseCurrency)
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
