using System;
using HRSystem.Models;

namespace HRSystem.DTO
{
	public class EmergencyContact
	{
		//public string FirstName { get; set; }
  //      public string LastName { get; set; }
		//public string? MiddleName { get; set; }
		//public string? Phone { get; set; }
		public Person person { get; set; }
		public Address Address { get; set; }
    }

    public class EmergencyContactSec
	{
		public List<EmergencyContact> emergencyContacts { get; set; }
	}
}

