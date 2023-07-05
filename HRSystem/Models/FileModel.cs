namespace HRSystem.Models
{
    public class FileModel
    {
        public IFormFile File { get; set; }

        public string? Title { get; set; }

        public string? IsVisaDocument { get; set; }

        public string? NextVisaStatus { get; set;}
    }
}
