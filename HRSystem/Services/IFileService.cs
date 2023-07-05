namespace HRSystem.Services
{
    using HRSystem.Models;

    public interface IFileService
    {
        Task Upload(FileModel fileModel);

        Task<Stream> Get(string imageName);
    }
}