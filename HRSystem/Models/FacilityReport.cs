using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HRSystem.Models
{
    public class FacilityReport
    {
        public int ID { get; set; }
        //public int ContactID { get; set; }
        //public string TYPE { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int? EmployeeID { get; set; }
        //public int Quantity { get; set; }
        public DateTime ReportDate { get; set; }
        //public int HouseID { get; set; }
        public string? STATUS { get; set; }


        // EF Relationships
        [ForeignKey("EmployeeID")]
        [JsonIgnore]
        public virtual Employee? Employee { get; set; }

        [InverseProperty("FacilityReport")]
        public virtual ICollection<FacilityReportDetail>? FacilityReportDetails { get; set; }
    }
}