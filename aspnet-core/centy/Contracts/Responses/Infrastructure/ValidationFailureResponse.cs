namespace centy.Contracts.Responses.Infrastructure;

public record ValidationFailureResponse
{
    public List<string>? Errors { get; init; }
}
