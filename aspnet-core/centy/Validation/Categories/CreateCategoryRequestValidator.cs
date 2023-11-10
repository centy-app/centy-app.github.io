using centy.Contracts.Requests.Categories;
using centy.Services.Currencies;

namespace centy.Validation.Categories;

public class CreateCategoryRequestValidator : AbstractValidator<CreateCategoryRequest>
{
    public CreateCategoryRequestValidator(ICurrenciesService currenciesService)
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Type).IsInEnum();
        RuleFor(x => x.CurrencyCode)
            .NotEmpty().MinimumLength(3).MaximumLength(3).Must(currenciesService.CurrencyExist);
    }
}
