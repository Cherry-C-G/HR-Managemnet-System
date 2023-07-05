namespace AuthService.Middleware
{
    using System.Threading.Tasks;
    using AuthService.Util;

    public class JwtMiddleware : IMiddleware
    {
        private readonly IJwtUtils _jwtUtils;

        public JwtMiddleware(IJwtUtils jwtUtils)
        {
            _jwtUtils = jwtUtils;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            string? token = context.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            if (token is null or ""){ throw new Exception("no Token"); }
            _jwtUtils.ValidateToken(token, context);
            await next(context);
        }
    }
}
