namespace HRSystem.Controllers
{
    using System.Security.Claims;
    using System.Transactions;
    using HRSystem.DAO;
    using HRSystem.DTO;
    using HRSystem.Enum;
    using HRSystem.Models;
    using HRSystem.Services;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    [ApiController]
    [Route("[controller]")]
    public class FileController : ControllerBase
    {
        private readonly IFileService _fileService;
        private readonly HRDbContext _dbContext;

        private readonly Dictionary<string, string> extensionToMediaType = new Dictionary<string, string>()
        {
                { ".jpg", "image/jpeg" },
                { ".jpeg", "image/jpeg" },
                { ".png", "image/png" },
                { ".pdf", "application/pdf" },
                { ".doc", "application/msword" },
                { ".docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }
            };
        public FileController(IFileService fileService, HRDbContext dbContext)
        {
            _fileService = fileService;
            _dbContext = dbContext;
        }



        [Route("/api/file/upload")]
        [HttpPost]
        public async Task<IActionResult> Upload([FromForm] FileModel model)
        {
            var personId = Convert.ToInt32(User.FindFirstValue("PersonId"));
            var employee = await _dbContext.Employees.Where(e => e.PersonId == personId).FirstOrDefaultAsync();
            if (employee == null || employee.Id == 0)
            {
                return BadRequest(new {message="fail to find employee"});
            }
            if(model.File is null || model.Title is null)
            {
                return BadRequest(new { message = "no file or file title" });
            }

            using(TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                await _fileService.Upload(model);
                var personalDocument = await _dbContext.PersonalDocuments.FirstOrDefaultAsync(pd=>pd.EmployeeId==employee.Id && pd.Title==model.Title);
                if(personalDocument != null)
                {
                    personalDocument.Path = model.File.FileName;
                    _dbContext.PersonalDocuments.Update(personalDocument);
                }
                else
                {
                    await _dbContext.PersonalDocuments.AddAsync(
                    new PersonalDocument()
                    {
                        EmployeeId = employee.Id,
                        Path = model.File.FileName,
                        Title = model.Title,
                        CreatedDate = DateTime.Now,
                        CreatedBy = 999
                    });
                }                
                await _dbContext.SaveChangesAsync();
                if(model.IsVisaDocument is not null && model.IsVisaDocument.Equals("true")) await UpdateVisaWorkFlow(model, employee.Id);
                scope.Complete();
            }
            return Ok(new {message="File uploaded"});
        }

        private async Task UpdateVisaWorkFlow(FileModel model, int employeeId)
        {
            var workFlow = await _dbContext.ApplicationWorkFlows.Where(w => w.EmployeeId.Equals(employeeId) && w.Type == WorkflowType.Visa.ToString())
                                                                .FirstOrDefaultAsync();
            if(workFlow is null)
            {
                workFlow = new ApplicationWorkFlow()
                {
                    EmployeeId = employeeId,
                    Type = WorkflowType.Visa.ToString(),
                    CreatedDate= DateTime.Now,
                    ModificationDate= DateTime.Now,
                    Status = model.NextVisaStatus
                };
                await _dbContext.ApplicationWorkFlows.AddAsync(workFlow);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                workFlow.ModificationDate = DateTime.Now;
                workFlow.Status = model.NextVisaStatus;
                _dbContext.Update(workFlow);
                await _dbContext.SaveChangesAsync();
            }
        }

        [HttpPost("/api/file/AddComment")]
        public async Task<IActionResult> AddComment(CommentRequest commentRequest)
        {
            var personId = commentRequest.PersonId;
            var employee = await _dbContext.Employees.Where(e => e.PersonId == personId).FirstOrDefaultAsync();
            if (employee == null || employee.Id == 0)
            {
                return BadRequest(new { message = "fail to find employee" });
            }
            if (commentRequest.Comment is null || commentRequest.Title is null)
            {
                return BadRequest(new { message = "no comment or file title" });
            }

            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var personalDocument = await _dbContext.PersonalDocuments.FirstOrDefaultAsync(pd => pd.EmployeeId == employee.Id && pd.Title == commentRequest.Title);
                if (personalDocument == null)
                {
                    return BadRequest(new { message = "file not found" });
                }
                personalDocument.Comment = commentRequest.Comment;
                _dbContext.PersonalDocuments.Update(personalDocument);
                await _dbContext.SaveChangesAsync();
                scope.Complete();
            }
            return Ok(new { message = "Comment added" });
        }

        [HttpGet("/api/file/{personId}")]
        public async Task<IActionResult> GetByPersonId(int personId)
        {
            //var personId = Convert.ToInt32(User.FindFirstValue("PersonId"));
            var employee = await _dbContext.Employees.Where(e => e.PersonId == personId).FirstOrDefaultAsync();
            if (employee == null || employee.Id == 0)
            {
                return BadRequest(new { message = "fail to find employee" });
            }
            var files = await _dbContext.PersonalDocuments.Where(pd => pd.EmployeeId == employee.Id).Select(x => new { Path = x.Path, Title = x.Title }).ToListAsync();
            return Ok(files);
        }

        [HttpGet("/api/file/GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var personId = Convert.ToInt32(User.FindFirstValue("PersonId"));
            var employee = await _dbContext.Employees.Where(e => e.PersonId == personId).FirstOrDefaultAsync();
            if (employee == null || employee.Id == 0)
            {
                return BadRequest(new { message = "fail to find employee" });
        }
            var files = await _dbContext.PersonalDocuments.Where(pd=>pd.EmployeeId== employee.Id).Select(x=>new {Path = x.Path,Title = x.Title}).ToListAsync();
            return Ok(files);
        }

        [HttpDelete("/api/file")]
        public async Task<IActionResult> Delete(string title)
        {
            var personId = Convert.ToInt32(User.FindFirstValue("PersonId"));
            var employee = await _dbContext.Employees.Where(e => e.PersonId == personId).FirstOrDefaultAsync();
            if (employee == null || employee.Id == 0)
            {
                return BadRequest(new { message = "fail to find employee" });
            }
            var files = await _dbContext.PersonalDocuments.FirstOrDefaultAsync(pd => pd.EmployeeId == employee.Id && pd.Title == title);
            if (files == null)
            {
                return BadRequest(new { message = "fail to find file" });
            }
            _dbContext.PersonalDocuments.Remove(files);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("/api/requiredfile")]
        public async Task<IActionResult> GetRequiredFiles()
        {
            var required = await _dbContext.DigitalDocuments.Where(d=>d.Required).Select(x => new { Title = x.Type, Path = x.TemplateLocation }).ToListAsync();

            return Ok(required);
        }

        [Route("/api/file/get")]
        [HttpGet]
        public async Task<IActionResult> Get(string fileName)
        {
            var fileStream = await _fileService.Get(fileName);
            var fileExtension = Path.GetExtension(fileName).ToLowerInvariant();

            if (!extensionToMediaType.TryGetValue(fileExtension, out var mediaType))
            {
                mediaType = "application/octet-stream";
            }

            return File(fileStream, mediaType);
        }

        [Route("/api/file/download")]
        [HttpGet]
        public async Task<IActionResult> GetDownload(string fileName)
        {
            var fileStream = await _fileService.Get(fileName);
            var fileExtension = Path.GetExtension(fileName).ToLowerInvariant();

            if (!extensionToMediaType.TryGetValue(fileExtension, out var mediaType))
            {
                mediaType = "application/octet-stream";
            }

            return File(fileStream, mediaType, fileName);
        }

        [Route("/api/avatar")]
        [HttpGet]
        public async Task<IActionResult> GetAvatar(string fileName)
        {
            var fileStream = await _fileService.Get(fileName);
            var fileExtension = Path.GetExtension(fileName).ToLowerInvariant();

            if (!extensionToMediaType.TryGetValue(fileExtension, out var mediaType))
            {
                mediaType = "application/octet-stream";
            }

            return File(fileStream, mediaType);
        }

        [Route("/api/avatar/upload")]
        [HttpPost]
        public async Task<IActionResult> UploadAvatar([FromForm] FileModel model)
        {
            var personId = Convert.ToInt32(User.FindFirstValue("PersonId"));
            var employee = await _dbContext.Employees.Where(e => e.PersonId == personId).FirstOrDefaultAsync();
            
            if (model.File is null)
            {
                return BadRequest(new { message = "no file or file title" });
            }

            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                await _fileService.Upload(model);
                if (employee is not null && employee.Id != 0)
                {
                    employee.Avatar = model.File.FileName;
                    _dbContext.Employees.Update(employee);
                    await _dbContext.SaveChangesAsync();
                }
                scope.Complete();
            }
            return Ok(new { message = "Avatar uploaded" });
        }
    }
}
