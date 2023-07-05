namespace AuthService.Model
{
    public class User
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }

        public string? Email { get; set; }

        public int PersonId { get; set; }

        public DateTime? CreateDate { get; set; }

        public DateTime? ModificationDate { get; set; }

        public virtual UserRole UserRole { get; set; }
    }
}
