namespace AuthService.Model
{
    using System.ComponentModel.DataAnnotations.Schema;

    public class UserRole
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int UserId { get; set; }

        public int RoleId { get; set; }

        public bool ActiveFlag { get; set; }

        public DateTime? CreateDate { get; set; }

        public DateTime? ModificationDate { get; set; }

        public int? LastModificationUser { get; set; }

        public virtual Role Role { get; set; }

        public virtual User User { get; set; }
    }
}
