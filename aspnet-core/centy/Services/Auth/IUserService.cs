using Microsoft.AspNetCore.Identity;
using centy.Domain.Auth;

namespace centy.Services.Auth;

public interface IUserService
{
    Task<SignInResult> LogInAsync(string? email, string? password);

    Task<IdentityResult> RegisterAsync(string? email, string? password, string? baseCurrencyCode);

    Task<ApplicationUser> GetUserByNameAsync(string? name);
}
