using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HRSystem.Models
{
    public class Facility
    {
        public int ID { get; set; }
        public string TYPE { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public int HouseID { get; set; }

        // EF Relationships
        [ForeignKey("HouseID")]
        [JsonIgnore]
        public virtual House? House { get; set; }
    }
}

