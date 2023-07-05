namespace AuthService.DAO
{
    public class RegistrationToken
    {
        public int ID { get; set; }

        public string? Token { get; set; }

        public DateTime ValidDuration { get; set; }

        public string? Email { get; set; }

        public int CreatedBy { get; set; }
    }
}