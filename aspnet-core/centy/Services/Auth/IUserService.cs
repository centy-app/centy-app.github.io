using centy.Domain.Auth;

namespace centy.Services.Auth;

public interface IUserService
{
    Task<ApplicationUser> GetUserByNameAsync(string? name);
}
