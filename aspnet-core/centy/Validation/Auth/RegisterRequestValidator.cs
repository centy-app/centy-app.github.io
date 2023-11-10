﻿using centy.Contracts.Requests.Auth;
using centy.Services.Currencies;

namespace centy.Validation.Auth;

public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
{
    public RegisterRequestValidator(ICurrenciesService currenciesService)
    {
        RuleFor(x => x.Email).NotEmpty().EmailAddress().MaximumLength(100);
        RuleFor(x => x.Password).NotEmpty().MinimumLength(5);
        RuleFor(x => x.BaseCurrencyCode)
            .NotEmpty().MinimumLength(3).MaximumLength(3).Must(currenciesService.CurrencyExist);
    }
}
