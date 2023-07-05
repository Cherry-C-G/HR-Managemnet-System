using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRSystem.DTO
{
	public class CreateFacilityReport
	{
        public int ID { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }
    }
}

