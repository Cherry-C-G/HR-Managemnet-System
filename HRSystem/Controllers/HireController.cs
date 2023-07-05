namespace HRSystem.Controllers
{
    using System.Net.Mail;
    using System.Net;
    using System.Security.Cryptography;
    using HRSystem.DAO;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    public class HireController:ControllerBase
    {
        private readonly ILogger<HireController> _logger;

        private readonly HRDbContext _dbContext;

        public HireController(HRDbContext dbContext, ILogger<HireController> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        [HttpPost("/api/Hire")]
        public async Task<ActionResult> Hire(string email)
        {
            var registerToken = _dbContext.RegistrationTokens.Where(r=>r.Email.Equals(email)).OrderByDescending(r=>r.ID).FirstOrDefault();
            if (registerToken != null && registerToken.ValidDuration > DateTime.UtcNow)
            {
                return BadRequest(new { message = "the token is already generated and is not yet expired" });
            }
            // Convert the email address to a byte array
            byte[] emailBytes = System.Text.Encoding.UTF8.GetBytes(email+DateTime.Now.ToString());

            // Create a SHA256 hash object
            using (SHA256 sha256 = SHA256.Create())
            {
                // Compute the hash value of the email address
                byte[] hashBytes = sha256.ComputeHash(emailBytes);

                // Convert the hash bytes to a hexadecimal string
                var token = BitConverter.ToString(hashBytes).Replace("-", string.Empty);

                _dbContext.RegistrationTokens.Add(new Models.RegistrationToken()
                {
                    Token = token,
                    Email = email,
                    ValidDuration= DateTime.UtcNow.AddHours(3),
                    CreatedBy = 999
                });
                await _dbContext.SaveChangesAsync();
                SendEmail(email, token);
            }

            return Ok();
        }

        private void SendEmail(string email, string token)
        {
            // Create an SMTP client
            using (SmtpClient smtpClient = new SmtpClient())
            {
                // Specify the SMTP server and credentials
                smtpClient.Host = "smtp.ethereal.email";
                smtpClient.Port = 587;
                smtpClient.Credentials = new NetworkCredential("clovis.little17@ethereal.email", "9ZRsv2gmFBN9gvUjR1");
                smtpClient.EnableSsl = true;

                // Create an email message
                MailMessage message = new MailMessage();
                message.From = new MailAddress("clovis.little17@ethereal.email");
                message.To.Add(email);
                message.Subject = "RegistrationInvite";
                message.Body = $"Please Use the Token: {token}, and your email address:{email} to register";

                // Send the email
                smtpClient.Send(message);
            }
        }
    }
}
