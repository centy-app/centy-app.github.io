namespace centy.Domain.Categories;

public class Category
{
    public Guid Id { get; init; }
    
    public Guid ParentId { get; set; }

    public Guid UserId { get; set; }

    public CategoryType Type { get; set; }

    public string Icon { get; set; } = "";

    public string Name { get; set; } = "";

    public string CurrencyCode { get; set; } = "";
}
