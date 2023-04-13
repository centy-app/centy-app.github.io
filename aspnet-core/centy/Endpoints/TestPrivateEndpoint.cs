using FastEndpoints;

namespace centy.Endpoints
{
    [HttpGet("test")]
    public class TestPrivateEndpoint : EndpointWithoutRequest
    {
        private readonly ILogger<TestPrivateEndpoint> logger;

        public TestPrivateEndpoint(ILogger<TestPrivateEndpoint> logger)
        {
            this.logger = logger;
        }

        public override async Task HandleAsync(CancellationToken ct)
        {
            logger.LogWarning("Test triggered.");

            await SendOkAsync(ct);
        }
    }
}
