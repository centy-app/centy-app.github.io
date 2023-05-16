namespace centy.Data.Currencies;

public class SymbolDto
{
    public SymbolDto(string description, string code)
    {
        Description = description;
        Code = code;
    }

    public string Description { get; set; }
    public string Code { get; set; }
}
