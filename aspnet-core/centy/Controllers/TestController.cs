using Microsoft.AspNetCore.Mvc;

namespace centy.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        private readonly ILogger<TestController> _logger;

        public TestController(ILogger<TestController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "Test")]
        public string Get()
        {
            _logger.LogTrace("Test triggered.");
            return "Hello world";
        }
    }
}
