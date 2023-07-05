namespace AuthService.Model
{
    public class Permission
    {
        public int Id { get; set; }
        public string? PermissionName { get; set; }

        public string? PermissionDescription { get; set; }

        public DateTime? CreateDate { get; set; }

        public DateTime? ModificationDate { get; set; }

        public int? LastModificationUser { get; set; }
    }
}
