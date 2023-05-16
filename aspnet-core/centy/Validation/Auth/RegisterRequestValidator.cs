using centy.Contracts.Requests.Auth;

namespace centy.Validation.Auth;

public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
{
    public RegisterRequestValidator()
    {
        RuleFor(x => x.Email).NotEmpty().EmailAddress().MaximumLength(100);
        RuleFor(x => x.Password).NotEmpty().MinimumLength(5);
        RuleFor(x => x.BaseCurrencyCode).NotEmpty().MinimumLength(3).MaximumLength(3);
        // TODO: BaseCurrencyCode should match one of stored in known currencies (to be implemented)
    }
}
