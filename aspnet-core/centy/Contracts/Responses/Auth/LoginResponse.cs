namespace centy.Contracts.Responses.Auth
{
    public class LoginResponse
    {
        public string Email { get; init; } = default!;
        public string Token { get; init; } = default!;
    }
}
