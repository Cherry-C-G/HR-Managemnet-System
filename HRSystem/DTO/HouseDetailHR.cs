using System;
namespace HRSystem.DTO
{
	public class HouseDetailHR
	{
        public int ID { get; set; }

        public int HouseID { get; set; }

        public string HouseAddress { get; set; }

        public string Landlord { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public int NumberOfEmployee { get; set; }
    }
}

