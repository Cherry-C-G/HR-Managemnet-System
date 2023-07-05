namespace HRSystem.Middleware
{
    using System.Net;
    using System.Threading.Tasks;
    using AuthService.Model;

    public class ExceptionMiddleware : IMiddleware
    {
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(ILogger<ExceptionMiddleware> logger)
        {
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                HttpResponse response = context.Response;
                int statusCode = ex switch
                {
                    _ => (int)HttpStatusCode.InternalServerError,
                };
                ExceptionResponse exceptionResponse = new()
                {
                    StatusCode = statusCode,
                    Message = ex.Message,
                };

                await response.WriteAsync(exceptionResponse?.ToString()??"");
            }
        }
    }
}
