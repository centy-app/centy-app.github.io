using centy.Domain.Auth;

namespace centy.Services.Auth;

public interface IJwtService
{
    string CreateToken(ApplicationUser user);
}
