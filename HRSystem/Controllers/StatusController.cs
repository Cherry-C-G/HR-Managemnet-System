namespace HRSystem.Controllers
{
    using System.Security.Claims;
    using HRSystem.DAO;
    using HRSystem.DTO;
    using HRSystem.Enum;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    [ApiController]
    public class StatusController : ControllerBase
    {
        private readonly ILogger<StatusController> _logger;

        private readonly HRDbContext _dbContext;

        public StatusController(ILogger<StatusController> logger, HRDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        [HttpGet("/api/GetStatus")]
        public async Task<ActionResult> GetStatus()
        {
            try
            {
                int personId = Convert.ToInt32(User.FindFirstValue("PersonId"));
                string role = User.FindFirstValue("Role");

                Models.Person? person = await _dbContext.Persons.FindAsync(personId);

                if (person == null)
                {
                    throw new Exception("Person not found");
                }

                if (role == "HR")
                {
                    return Ok(new StatusResponse() { Status = "HRStatus", Name = person.PreferredName!=null&&person.PreferredName!=""? person.PreferredName : person.Firstname, Avatar = "default.png" });
                }

                Models.Employee? employee = await _dbContext.Employees.Where(e => e.PersonId == personId).Include(e => e.VisaStatus).FirstOrDefaultAsync();
                if (employee == null || employee.Id == 0)
                {
                    return Ok(new StatusResponse() { Status = "Open", Name = person.PreferredName != null && person.PreferredName != "" ? person.PreferredName : person.Firstname });
                }

                Models.ApplicationWorkFlow? applicationWorkFlow = await _dbContext.ApplicationWorkFlows.FirstOrDefaultAsync(a => a.EmployeeId == employee.Id && a.Type == WorkflowType.OnBoarding.ToString());
                if (applicationWorkFlow == null)
                {
                    _ = _dbContext.ApplicationWorkFlows.Add(new Models.ApplicationWorkFlow()
                    {
                        EmployeeId = employee.Id,
                        CreatedDate = DateTime.Now,
                        Status = "Open",
                        Type = WorkflowType.OnBoarding.ToString(),
                    });
                    await _dbContext.SaveChangesAsync();
                    return Ok(new StatusResponse()
                    {
                        Status = "Open",
                        Name = person.PreferredName!=null&&person.PreferredName!=""? person.PreferredName : person.Firstname,
                        Avatar = employee.Avatar,
                    });
                }

                Models.ApplicationWorkFlow? visaStatus = await _dbContext.ApplicationWorkFlows.FirstOrDefaultAsync(a => a.EmployeeId == employee.Id && a.Type == WorkflowType.Visa.ToString());

                var personalDocuments = await _dbContext.PersonalDocuments.Where(pd => pd.EmployeeId == employee.Id).OrderByDescending(pd => pd.CreatedDate).ToListAsync();

                return Ok(new StatusResponse()
                {
                    Status = applicationWorkFlow?.Status ?? "Open",
                    VisaStatus = visaStatus?.Status ?? "",
                    VisaType = employee.VisaStatus?.VisaType ?? "",
                    Name = person.PreferredName != null && person.PreferredName != "" ? person.PreferredName : person.Firstname,
                    VisaEndDate = employee.VisaEndDate?? DateTime.MinValue,
                    Avatar = employee.Avatar,
                    Comment = applicationWorkFlow?.Comments??"",
                    DocumentComment = personalDocuments.Select(pd=>new {Title = pd.Title,Comment = pd.Comment}),
                });
            }
            catch(Exception ex)
            {
                _logger.LogError(ex?.Message);
                throw;
            }
        }

        [HttpPatch("/api/ApplicationStatus")]
        public async Task<ActionResult> UpdateApplicationStatus([FromQuery] string status)
        {
            try
            {
                int personId = Convert.ToInt32(User.FindFirstValue("PersonId"));

                Models.Person? person = await _dbContext.Persons.FindAsync(personId);

                if (person == null)
                {
                    throw new Exception("Person not found");
                }

                Models.Employee? employee = await _dbContext.Employees.Where(e => e.PersonId == personId).Include(e => e.VisaStatus).FirstOrDefaultAsync();
                if (employee == null || employee.Id == 0)
                {
                    throw new Exception("Employee not found");
                }

                Models.ApplicationWorkFlow? applicationWorkFlow = await _dbContext.ApplicationWorkFlows.FirstOrDefaultAsync(a => a.EmployeeId == employee.Id && a.Type == WorkflowType.OnBoarding.ToString());
                if (applicationWorkFlow == null)
                {
                    _ = await _dbContext.ApplicationWorkFlows.AddAsync(new Models.ApplicationWorkFlow()
                    {
                        EmployeeId = employee.Id,
                        CreatedDate = DateTime.Now,
                        Status = status,
                        Type = WorkflowType.OnBoarding.ToString(),
                    });
                }
                else
                {
                    applicationWorkFlow.Status = status;
                }
                await _dbContext.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex?.Message);
                throw;
            }
        }
    }
}
