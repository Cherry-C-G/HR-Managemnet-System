namespace HRSystem.Util
{
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using Microsoft.Extensions.Configuration;
    using Microsoft.IdentityModel.Tokens;

    public class JWTTokenUtil : IJwtUtils
    {
        private readonly IConfiguration _configuration;

        public JWTTokenUtil(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        public void ValidateToken(string? token, HttpContext context)
        {
            if (token == null)
            {
                throw new Exception("No JwtToken");
            }
            JwtSecurityTokenHandler tokenHandler = new();
            byte[] key = Encoding.ASCII.GetBytes(_configuration.GetValue<string>("Jwt:Key"));
            _ = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);
            IEnumerable<Claim> claims = ((JwtSecurityToken)validatedToken).Claims;
            ClaimsIdentity identity = new(claims, "Token");
            ClaimsPrincipal principal = new(identity);
            context.User = principal;
        }
    }
}
