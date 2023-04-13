namespace centy.Contracts.Responses.Auth
{
    public class AboutMeResponse
    {
        public Guid Id { get; set; }

        public string Email { get; init; } = default!;
    }
}
