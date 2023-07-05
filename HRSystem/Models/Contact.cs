using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HRSystem.Models
{
    [Table("Contact")]
    public class Contact
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }


        public int PersonId { get; set; }
        //EF relationship
        [ForeignKey("PersonId")]
        [JsonIgnore]
        public virtual Person? Person { get; set; }


        [StringLength(20)]
        public string Relationship { get; set; }


        [StringLength(20)]
        public string? Title { get; set; }


        public bool isReferrence { get; set; }


        public bool isEmergency { get; set; }


        public bool isLandlord { get; set; }


        public int ContactPersonId { get; set; }
        //EF relationship
        [ForeignKey("ContactPersonId")]
        [JsonIgnore]
        public virtual Person? ContactPerson { get; set; }

        [InverseProperty("Contact")]
        public virtual ICollection<House>? Houses { get; set; }  // one landlord can have many houses
    }
}

