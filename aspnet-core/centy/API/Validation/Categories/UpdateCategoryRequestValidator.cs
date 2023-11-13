using centy.API.Contracts.Requests.Categories;

namespace centy.API.Validation.Categories;

public class UpdateCategoryRequestValidator : AbstractValidator<UpdateCategoryRequest>
{
    public UpdateCategoryRequestValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
    }
}
