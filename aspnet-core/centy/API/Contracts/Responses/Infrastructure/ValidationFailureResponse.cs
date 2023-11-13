namespace centy.API.Contracts.Responses.Infrastructure;

public record ValidationFailureResponse
{
    public List<string>? Errors { get; init; }
}
