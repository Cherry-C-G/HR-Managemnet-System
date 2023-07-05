using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HRSystem.Models
{
    [Table("PersonalDocument")]
    public class PersonalDocument
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }


        public int EmployeeId { get; set; }
        //EF relationship
        [ForeignKey("EmployeeId")]
        [JsonIgnore]
        public virtual Employee Employee { get; set; }


        [DataType(DataType.Url)]
        public string Path { get; set; }


        [StringLength(50)]
        public string Title { get; set; }


        [StringLength(500)]
        public string? Comment { get; set; }


        [DisplayName("Created Date")]
        [DataType(DataType.Date)]
        public DateTime? CreatedDate { get; set; }


        [DisplayName("Created By")]
        public int? CreatedBy { get; set; }
    }
}
