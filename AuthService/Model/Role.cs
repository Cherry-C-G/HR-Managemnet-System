namespace AuthService.Model
{
    public class Role
    {
        public int Id { get; set; }

        public string RoleName { get; set; }

        public string? Description { get; set; }

        public DateTime? CreateDate { get; set; }

        public DateTime? ModificationDate { get; set; }

        public int? LastModificationUser { get; set; }

        public virtual RolePermission RolePermission { get; set; }
    }
}