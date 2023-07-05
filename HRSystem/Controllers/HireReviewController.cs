using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HRSystem.Models;
using HRSystem.DAO;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Net.Mail;
using Newtonsoft.Json.Linq;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HRSystem.Controllers
{
    [ApiController]
    [Route("api/HireReview")]
    public class HireReviewController : ControllerBase
    {
        private readonly ILogger<HireController> _logger;

        private readonly HRDbContext _dbContext;

        public HireReviewController(HRDbContext dbContext, ILogger<HireController> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        // get all applications
        [HttpGet("GetAllOnboardingApplication")]
        public ActionResult GetAllOnboardingApplication()
        {
            var res = _dbContext.ApplicationWorkFlows.Where(x => x.Type == "OnBoarding").Include(x => x.Employee).ToList();
            return Ok(res);
        }

        // change status
        [HttpPost("ChangeOnboardingStatus")]
        public ActionResult ChangeOnboardingStatus(ApplicationWorkFlow applicationWorkFlow)
        {
            var res = _dbContext.ApplicationWorkFlows.Where(x => x.Id == applicationWorkFlow.Id).FirstOrDefault();
            if (res != null)
            {
                res.Comments = applicationWorkFlow.Comments;
                res.Status = applicationWorkFlow.Status;
            }
            _dbContext.SaveChanges();

            //get email
            var employee = _dbContext.Employees.Where(e => e.Id == applicationWorkFlow.EmployeeId).FirstOrDefault();
            if (employee != null)
            {
                var person = _dbContext.Persons.Where(p => p.Id == employee.PersonId).FirstOrDefault();

                if (person.Email != null)
                {
                    if (applicationWorkFlow.Status == "Completed")
                    {
                        SendEmail(person.Email, true);
                    }
                    else if (applicationWorkFlow.Status == "Rejected")
                    {
                        SendEmail(person.Email, false);
                    }
                } 
            }
            
            return Ok(new { message = "Status update succeed" });
        }

        [HttpGet("GetApplication/{id}")]
        public ActionResult GetApplication(int id)
        {
            var res = _dbContext.ApplicationWorkFlows.Where(x => x.Id == id).Include(x => x.Employee).FirstOrDefault();
            return Ok(res);
        }


        private void SendEmail(string email, bool isCompleted)
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
                message.Subject = "Application Status Update";
                if (isCompleted)
                    message.Body = "Your application is completed!";
                else
                    message.Body = "Your application is rejected, please check comments and submit again after fix the issue.";

                // Send the email
                smtpClient.Send(message);
            }
        }
    }
}

