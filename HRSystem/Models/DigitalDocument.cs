using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRSystem.Models
{
    [Table("DigitalDocument")]
    public class DigitalDocument
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }


        [DisplayName("Type of the document")]
        public string Type { get; set; }


        public bool Required { get; set; }


        [DataType(DataType.Url)]
        public string TemplateLocation { get; set; }


        [StringLength(500)]
        public string Description { get; set; }
    }
}
