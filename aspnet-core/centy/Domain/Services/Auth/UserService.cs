﻿using Microsoft.AspNetCore.Identity;
using centy.Domain.ValueObjects.Auth;

namespace centy.Domain.Services.Auth;

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
        if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
        {
            return SignInResult.Failed;
        }

        return await _signInManager.PasswordSignInAsync(email, password, true, false);
    }

    public async Task<IdentityResult> RegisterAsync(string? email, string? password, string? baseCurrencyCode)
    {
        if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
        {
            return IdentityResult.Failed(new IdentityError
            {
                Code = "0001",
                Description = "Invalid email or password"
            });
        }

        var user = new ApplicationUser
        {
            UserName = email,
            Email = email,
            BaseCurrencyCode = baseCurrencyCode?.ToUpperInvariant()
        };

        return await _userManager.CreateAsync(user, password);
    }

    public async Task<ApplicationUser?> GetUserByNameAsync(string? name)
    {
        if (string.IsNullOrEmpty(name))
        {
            return null;
        }

        //TODO: introduce caching
        return await _userManager.FindByNameAsync(name);
    }
}