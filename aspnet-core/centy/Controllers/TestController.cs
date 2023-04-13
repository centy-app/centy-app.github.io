using centy.Domain.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace centy.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        private readonly ILogger<TestController> _logger;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;

        public TestController(ILogger<TestController> logger, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _logger = logger;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpGet(Name = "Test")]
        public async Task<string> Get()
        {
            var user = new ApplicationUser()
            {
                UserName = "test2@test.com",
                Email = "test2@test.com"
            };

            var result = await userManager.CreateAsync(user, "P@ssw0rd");

            _logger.LogTrace("Test triggered.");
            return "Hello world 3.0";
        }
    }
}
