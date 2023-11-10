using Microsoft.AspNetCore.Identity;
using centy.Domain.Auth;

namespace centy.Services.Auth;

public class UserService : IUserService
{
    private readonly ILogger<UserService> _logger;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IJwtService _jwtService;

    public UserService(
        ILogger<UserService> logger,
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        IJwtService jwtService)
    {
        _logger = logger;
        _userManager = userManager;
        _signInManager = signInManager;
        _jwtService = jwtService;
    }

    //TODO: move auth logic from endpoints to that service
    
    public async Task<ApplicationUser> GetUserByNameAsync(string? name)
    {
        //TODO: introduce caching
        return await _userManager.FindByNameAsync(name);
    }
}
