using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HRSystem.Models
{
    public class FacilityReportDetail
    {
        public int? ID { get; set; }
        public int? ReportID { get; set; }
        public int? EmployeeID { get; set; }
        public string Comments { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? LastModificationDate { get; set; }

        // EF Relationships
        [ForeignKey("ReportID")]
        [JsonIgnore]
        public virtual FacilityReport? FacilityReport { get; set; }
    }
}