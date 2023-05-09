using Microsoft.AspNetCore.Authorization.Policy;
using Microsoft.AspNetCore.Authorization;

namespace centy.Infrastructure
{
    public class CustomAuthResultHandler : IAuthorizationMiddlewareResultHandler
    {
        private readonly AuthorizationMiddlewareResultHandler _defaultHandler = new();

        public async Task HandleAsync(
            RequestDelegate next,
            HttpContext context,
            AuthorizationPolicy policy,
            PolicyAuthorizationResult authorizeResult)
        {
            if (authorizeResult is { Challenged: true, Succeeded: false })
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                context.Response.ContentType = "text/plain";
                await context.Response.WriteAsync("Unauthorized");

                return;
            }

            // Fall back to the default implementation.
            await _defaultHandler.HandleAsync(next, context, policy, authorizeResult);
        }
    }
}
