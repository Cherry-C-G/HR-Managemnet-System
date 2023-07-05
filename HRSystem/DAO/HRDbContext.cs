using System;
using System.Security;
using Microsoft.EntityFrameworkCore;
using HRSystem.Models;
using HRSystem.DTO;

namespace HRSystem.DAO
{
    public class HRDbContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public HRDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder option)
        {
            option.UseSqlServer(_configuration.GetConnectionString("Default"));
            option.LogTo(Console.WriteLine);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //fluent APIs
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<Contact>().ToTable("Contact");
            modelBuilder.Entity<Person>().ToTable("Person");
            modelBuilder.Entity<Address>().ToTable("Address");

            modelBuilder.Entity<RegistrationToken>().ToTable("RegistrationToken");
            modelBuilder.Entity<Employee>().ToTable("Employee");
            modelBuilder.Entity<Facility>().ToTable("Facility");
            modelBuilder.Entity<FacilityReport>().ToTable("FacilityReport");
            modelBuilder.Entity<FacilityReportDetail>().ToTable("FacilityReportDetail");
            modelBuilder.Entity<House>().ToTable("House");


            //onBoarding tables relationship starts
            //one to one
            modelBuilder.Entity<Person>()
            .HasOne(p => p.Address)
            .WithOne(a => a.Person)
            .HasForeignKey<Address>(a => a.PersonId);

            modelBuilder.Entity<Person>()
            .HasOne(p => p.Employee)
            .WithOne(e => e.Person)
            .HasForeignKey<Employee>(e => e.PersonId);

            modelBuilder.Entity<VisaStatus>()
            .HasOne(vs => vs.Employee)
            .WithOne(e => e.VisaStatus)
            .HasForeignKey<Employee>(e => e.VisaStatusId);

            modelBuilder.Entity<Employee>()
            .HasOne(e => e.ApplicationWorkFlow)
            .WithOne(a => a.Employee)
            .HasForeignKey<ApplicationWorkFlow>(a => a.EmployeeId);

            modelBuilder.Entity<Person>()
            .HasOne(p => p.Contact)
            .WithOne(c => c.ContactPerson)
            .HasForeignKey<Contact>(c => c.ContactPersonId);

            //one to many
            modelBuilder.Entity<Contact>()
            .HasOne(c => c.Person)
            .WithMany(p => p.ContactList)
            .HasForeignKey(c => c.PersonId);

            modelBuilder.Entity<PersonalDocument>()
            .HasOne(pd => pd.Employee)
            .WithMany(e => e.PersonalDocuments)
            .HasForeignKey(pd => pd.EmployeeId);
            //onBoarding tables relationship ends

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Person> Persons { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<PersonalDocument> PersonalDocuments { get; set; }
        public DbSet<ApplicationWorkFlow> ApplicationWorkFlows { get; set; }
        public DbSet<DigitalDocument> DigitalDocuments { get; set; }

        public DbSet<RegistrationToken> RegistrationTokens { get; set; }

        public virtual DbSet<Facility> Facilities { get; set; }
        public virtual DbSet<FacilityReport> FacilityReports { get; set; }
        public virtual DbSet<FacilityReportDetail> FacilityReportDetails { get; set; }
        public virtual DbSet<House> Houses { get; set; }
        public virtual DbSet<HouseDetail> HouseDetails { get; set; }
        public DbSet<VisaStatus> VisaStatuses { get; set; }

    }
}

