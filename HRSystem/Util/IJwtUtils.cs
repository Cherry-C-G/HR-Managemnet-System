namespace HRSystem.Util
{
    using HRSystem.Models;

    public interface IJwtUtils
    {
        void ValidateToken(string token, HttpContext context);
    }
}
