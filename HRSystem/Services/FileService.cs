namespace HRSystem.Services
{
    using System.Threading.Tasks;
    using Azure.Storage.Blobs;
    using HRSystem.Models;

    public class FileService : IFileService 
    {
        private readonly BlobServiceClient _blobServiceClient;
        public FileService(BlobServiceClient blobServiceClient)
        {
            _blobServiceClient = blobServiceClient;
        }

        public async Task Upload(FileModel fileModel)
        {
            var blobContainer = _blobServiceClient.GetBlobContainerClient("hrsystemfile");

            var blobClient = blobContainer.GetBlobClient(fileModel.File.FileName);

            await blobClient.UploadAsync(fileModel.File.OpenReadStream());
        }

        public async Task<Stream> Get(string imageName)
        {
            var blobContainer = _blobServiceClient.GetBlobContainerClient("hrsystemfile");

            var blobClient = blobContainer.GetBlobClient(imageName);
            var downloadContent = await blobClient.DownloadAsync();
            return downloadContent.Value.Content;
        }
    }
}
