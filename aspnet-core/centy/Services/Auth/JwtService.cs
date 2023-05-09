using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using centy.Domain.Auth;

namespace centy.Services.Auth
{
    public static class JwtService
    {
        public static readonly string TokenSigningKey =
            Environment.GetEnvironmentVariable("JWTKEY") ?? "98cf0eed-4b0c-405f-9913-dce91b99a506";

        public static string CreateToken(ApplicationUser user)
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

        private static JwtSecurityToken CreateJwtToken(
            IEnumerable<Claim> claims,
            SigningCredentials credentials,
            DateTime expiration) => new(
                "centy",
                "centy",
                claims,
                expires: expiration,
                signingCredentials: credentials
        );

        private static IEnumerable<Claim> CreateClaims(ApplicationUser user)
        {
            try
            {
                var claims = new List<Claim>
                {
                    new (JwtRegisteredClaimNames.Sub, "centy"),
                    new (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new (JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString(CultureInfo.InvariantCulture)),
                    new (ClaimTypes.Name, user.UserName),
                    new (ClaimTypes.Email, user.Email)
                };
                return claims;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        private static SigningCredentials CreateSigningCredentials()
        {
            return new SigningCredentials(
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(TokenSigningKey)
                ),
                SecurityAlgorithms.HmacSha256
            );
        }
    }
}
