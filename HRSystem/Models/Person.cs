using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HRSystem.Models
{

    [Table("Person")]
    public class Person
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }


        public string? Firstname { get; set; }


        public string? Lastname { get; set; }


        public string? Middlename { get; set; }


        [DataType(DataType.EmailAddress)]
        public string? Email { get; set; }

        [DataType(DataType.PhoneNumber)]
        public string? CellPhone { get; set; }


        [DataType(DataType.PhoneNumber)]
        public string? AlternatePhone { get; set; }


        public string? Gender { get; set; }


        public string? SSN { get; set; }


        [DataType(DataType.Date)]
        public DateTime? DOB { get; set; }


        //EF relationships
        public virtual Address? Address { get; set; }

        public virtual Employee? Employee { get; set; }

        public virtual ICollection<Contact>? ContactList { get; set; }//one person has many contacts

        public virtual Contact? Contact { get; set; }//one contact has one contact person

        public string? PreferredName { get; set; }

        public string? WorkEmail { get; set; }

        
    }
}

