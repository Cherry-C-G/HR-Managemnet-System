using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRSystem.Models
{
    [Table("ApplicationWorkFlow")]
    public class ApplicationWorkFlow
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }


        public int EmployeeId { get; set; }
        //EF relationship
        public virtual Employee? Employee { get; set; }


        //[Required, DisplayName("Created Date")]
        //[DataType(DataType.Date)]
        public DateTime CreatedDate { get; set; }


        //[Required, DisplayName("Modification Date")]
        //[DataType(DataType.Date)]
        public DateTime ModificationDate { get; set; }


        //[Required, DisplayName("Application Status")]
        public string? Status { get; set; }


        [StringLength(500, ErrorMessage = "Please write down less than 500 letters")]
        public string? Comments { get; set; }


        [DisplayName("Application Type")]
        [StringLength(20)]
        public string Type { get; set; }
    }
}
