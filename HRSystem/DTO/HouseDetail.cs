using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRSystem.DTO
{
    public class HouseDetail
    {
        public int ID { get; set; }

        public string HouseAddress { get; set; }

        public string PreferredName { get; set; }

        public string Phone { get; set; }

    }
}