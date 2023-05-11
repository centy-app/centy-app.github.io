namespace centy.Contracts.Responses.Infrastructure;

public class ValidationFailureResponse
{
    public List<string> Errors { get; set; } = default!;
}
