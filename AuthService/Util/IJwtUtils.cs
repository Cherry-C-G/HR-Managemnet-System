namespace AuthService.Util
{
    using AuthService.Model;

    public interface IJwtUtils
    {
        string GenerateToken(User user);
        void ValidateToken(string token, HttpContext context);
    }
}
