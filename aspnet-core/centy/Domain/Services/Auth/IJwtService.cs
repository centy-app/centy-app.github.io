using centy.Domain.Entities.Auth;

namespace centy.Domain.Services.Auth;

public interface IJwtService
{
    string CreateToken(ApplicationUser user);
}
