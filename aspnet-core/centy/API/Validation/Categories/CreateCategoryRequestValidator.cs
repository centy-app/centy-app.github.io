using centy.API.Contracts.Requests.Categories;
using centy.Domain.Services.Currencies;

namespace centy.API.Validation.Categories;

public class CreateCategoryRequestValidator : AbstractValidator<CreateCategoryRequest>
{
    public CreateCategoryRequestValidator(ICurrenciesService currenciesService)
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Type).IsInEnum();
        RuleFor(x => x.CurrencyCode).NotEmpty().Must(currenciesService.CurrencyExist).MaximumLength(3);
    }
}
