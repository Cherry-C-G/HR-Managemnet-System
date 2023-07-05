using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace AuthService.Model
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


        //Gender
        public string? Gender { get; set; }


        public string? SSN { get; set; }


        [DataType(DataType.Date)]
        public DateTime? DOB { get; set; }
    }
}

