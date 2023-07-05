using System;
namespace HRSystem.DTO
{
	public class EmployeeHouseHR
	{
        public int ID { get; set; }
        public int EmployeeID { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Car { get; set; }
        public int PersonID { get; internal set; }
    }
}

