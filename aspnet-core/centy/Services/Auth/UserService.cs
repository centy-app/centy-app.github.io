using Microsoft.AspNetCore.Identity;
using centy.Domain.Auth;

namespace centy.Services.Auth;

public class UserService : IUserService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;

    public UserService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    public async Task<SignInResult> LogInAsync(string? email, string? password)
    {
        return await _signInManager.PasswordSignInAsync(email, password, true, false);
    }

    public async Task<IdentityResult> RegisterAsync(string? email, string? password, string? baseCurrencyCode)
    {
        var user = new ApplicationUser
        {
            UserName = email,
            Email = email,
            BaseCurrencyCode = baseCurrencyCode?.ToUpperInvariant()
        };

        return await _userManager.CreateAsync(user, password);
    }

    public async Task<ApplicationUser> GetUserByNameAsync(string? name)
    {
        //TODO: introduce caching
        return await _userManager.FindByNameAsync(name);
    }
}
