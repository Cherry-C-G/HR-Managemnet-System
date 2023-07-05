namespace AuthService.DAO
{
    using AuthService.Model;
    using Microsoft.EntityFrameworkCore;

    public class AuthDbContext : DbContext
    {
        public AuthDbContext()
        {
            _ = new AuthDbContext(new DbContextOptions<AuthDbContext>());
        }

        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
        {
        }

        public DbSet<User> User { get; set; }
        public DbSet<Permission> Permission { get; set; }
        public DbSet<RolePermission> RolePermission { get; set; }
        public DbSet<UserRole> UserRole { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<RegistrationToken> RegistrationTokens { get; set; }
        public DbSet<Person> Person { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            _ = modelBuilder.Entity<RolePermission>()
                            .HasKey(up => new { up.RoleId, up.PermissionId });

            _ = modelBuilder.Entity<UserRole>()
                            .HasKey(up => new { up.RoleId, up.UserId });

            _ = modelBuilder.Entity<RegistrationToken>().ToTable("RegistrationToken");

        }
    }
}
