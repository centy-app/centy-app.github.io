namespace centy.Data.Currencies;

public class SymbolsDto
{
    public SymbolsDto(Dictionary<string, SymbolDto> symbols)
    {
        Symbols = symbols;
    }

    public Dictionary<string, SymbolDto> Symbols { get; set; }
}
