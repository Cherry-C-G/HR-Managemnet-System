namespace AuthService.Model
{
    public class RolePermission
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
        public int PermissionId { get; set; }

        public bool ActiveFlag { get; set; }

        public DateTime? CreateDate { get; set; }

        public DateTime? ModificationDate { get; set; }

        public int? LastModificationUser { get; set; }

        public virtual Role? Role { get; set; }
        public virtual Permission? Permission { get; set; }
    }
}
