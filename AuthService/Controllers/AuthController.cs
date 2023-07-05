namespace AuthService.Controllers
{
    using AuthService.DAO;
    using AuthService.Model;
    using AuthService.Util;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata;
    using Microsoft.Extensions.Configuration;

    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly AuthDbContext _authDbContext;
        private readonly IJwtUtils _jwtUtils;

        public AuthController(IConfiguration configuration, AuthDbContext authDbContext, IJwtUtils jwtUtils)
        {
            _configuration = configuration;
            _authDbContext = authDbContext;
            _jwtUtils = jwtUtils;
        }

        [HttpPost("/api/Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return Unauthorized();
            }

            User? user = await _authDbContext.User.Include(u => u.UserRole)
                                            .ThenInclude(ur => ur.Role)
                                            .ThenInclude(r => r.RolePermission)
                                            .ThenInclude(rp => rp.Permission)
                                            .FirstOrDefaultAsync(u => u.Username == request.Username && u.Password == request.Password);

            // Validate the username and password
            if (user is not null)
            {
                string accessToken = _jwtUtils.GenerateToken(user);
                if (accessToken is null or "")
                { return BadRequest(); }
                // Return the access token
                return Ok(new { Message = "Successfully Authenticated", AccessToken = accessToken, Role = user.UserRole.Role.RoleName });
            }

            // Return an error if the username and password are invalid
            return Unauthorized();
        }

        [HttpPost("/api/Register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (!ModelState.IsValid)
            {
                return Unauthorized();
            }

            if(await _authDbContext.User.FirstOrDefaultAsync(x=>x.Email== request.Email) is not null)
            {
                return BadRequest(new { message = "You have already registered" });
            }

            var token = await _authDbContext.RegistrationTokens.OrderByDescending(x => x.ID).FirstOrDefaultAsync(x => x.Email == request.Email);
            if(token is null || token.Token != request.Token || token.ValidDuration <= DateTime.UtcNow)
            {
                return BadRequest(new {message = "InvalidToken, please check or reach HR for help"});
            }
            using(var transaction = await _authDbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var person = new Person()
                    {
                        Firstname= request.FirstName,
                        Lastname = request.LastName,
                        Email= request.Email,
                    };
                    await _authDbContext.Person.AddAsync(person);
                    await _authDbContext.SaveChangesAsync();


                    var user = new User()
                    {
                        Username = request.Username,
                        Password = request.Password,
                        Email = request.Email,
                        PersonId = person.Id,
                        CreateDate = DateTime.UtcNow,
                        ModificationDate = DateTime.UtcNow
                    };

                    await _authDbContext.User.AddAsync(user);
                    await _authDbContext.SaveChangesAsync();

                    var ueserRole = new UserRole()
                    {
                        UserId = user.Id,
                        RoleId = 2,
                        ActiveFlag = true,
                        CreateDate = DateTime.UtcNow,
                        ModificationDate = DateTime.UtcNow,
                        LastModificationUser = 999
                    };

                    await _authDbContext.UserRole.AddAsync(ueserRole);
                    await _authDbContext.SaveChangesAsync();
                    await transaction.CommitAsync();
                }
                catch (Exception)
                {                    
                    transaction.Rollback();
                    return BadRequest(new { message = "Fail to register" });
                }
            }
            

            // Return an error if the username and password are invalid
            return Ok();
        }
    }
}
