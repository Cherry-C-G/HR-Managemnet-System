using System;
using Microsoft.EntityFrameworkCore.SqlServer;
using Microsoft.EntityFrameworkCore;
using HRSystem.Models;
using HRSystem.DTO;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Security.Cryptography;

namespace HRSystem.DAO
{
    public class PersonInfoDAO
    {
        private readonly HRDbContext _dbContext;

        public PersonInfoDAO(HRDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        //get user by userid
        public User GetUserByID(int userid)
        {
            return _dbContext.Users.Where(u => u.Id == userid).FirstOrDefault();
        }

        //get person by pid
        public Person GetPerson(int pid)
        {
            //var test = _dbContext.Persons.ToList();

            return _dbContext.Persons.Where(p => p.Id == pid).FirstOrDefault();
        }

        //get address by pid
        public List<Address> GetAddress(int pid)
        {
            return _dbContext.Addresses.Where(a => a.PersonId == pid).ToList();
        }

        //get contact by pid
        public List<Contact> GetContact(int pid)
        {
            return _dbContext.Contacts.Where(c => c.PersonId == pid).ToList();
        }

        //get employee by pid
        public Employee GetEmployee(int pid)
        {
            return _dbContext.Employees.Where(e => e.PersonId == pid).FirstOrDefault();
        }

        //get visastatus by visaid
        public VisaStatus GetVisaStatus(int vid)
        {
            return _dbContext.VisaStatuses.Where(e => e.Id == vid).FirstOrDefault();
        }

        //get personal doc 
        public List<PersonalDocument> GetPersonalDocuments(int pid)
        {
            return _dbContext.PersonalDocuments.Where(doc => doc.CreatedBy == pid).ToList();
        }

        //update person
        public void UpdatePerson(Person person)
        {
            var res = _dbContext.Persons.SingleOrDefault(x => x.Id == person.Id);
            if (res != null)
            {
                res.Firstname = person.Firstname;
                res.Lastname = person.Lastname;
                res.Middlename = person.Middlename;
                res.PreferredName = person.PreferredName;
                res.DOB = person.DOB;
                res.SSN = person.SSN;
                res.Gender = person.Gender;
            }
            _dbContext.SaveChanges();
        }

        //update address
        public void UpdateAddress(Address address)
        {
            var res = _dbContext.Addresses.SingleOrDefault(x => x.Id == address.Id);
            if (res != null)
            {
                res.AddressLine1 = address.AddressLine1;
                res.AddressLine2 = address.AddressLine2;
                res.City = address.City;
                res.StateName = address.StateName;
                res.StateAbbr = address.StateAbbr;
                res.Zipcode = address.Zipcode;
            }
            _dbContext.SaveChanges();
        }

        //update contact 
        public void UpdateContact(Person person)
        {
            var res = _dbContext.Persons.SingleOrDefault(x => x.Id == person.Id);
            if (res != null)
            {
                res.Email = person.Email;
                res.WorkEmail = person.WorkEmail;
                res.CellPhone = person.CellPhone;
                //work phone
            }
            _dbContext.SaveChanges();
        }

        //update Employee
        public void UpdateEmployee(Employee employee)
        {
            var res = _dbContext.Employees.SingleOrDefault(x => x.Id == employee.Id);
            if (res != null)
            {
                res.VisaStartDate = employee.VisaStartDate;
                res.VisaEndDate = employee.VisaEndDate;
                res.StartDate = employee.StartDate;
                res.EndDate = employee.EndDate;
                res.Title = employee.Title;
                //visastatus table 
            }
            _dbContext.SaveChanges();
        }

        //update emergency 
        public void UpdateEmergency(EmergencyContact emergencyContact)
        {
            //person table
            var person = _dbContext.Persons.SingleOrDefault(x => x.Id == emergencyContact.person.Id);
            if (person != null)
            {
                person.Firstname = emergencyContact.person.Firstname;
                person.Lastname = emergencyContact.person.Lastname;
                person.Middlename = emergencyContact.person.Middlename;
            }
            _dbContext.SaveChanges();

            //address table
            UpdateAddress(emergencyContact.Address);
        }


        //update document
        public void UpdateDocument(PersonalDocument doc)
        {
            var res = _dbContext.PersonalDocuments.SingleOrDefault(x => x.Id == doc.Id);
            if (res != null)
            {
                res.Path = res.Path;
                res.Title = res.Title;
                res.Comment = res.Comment;

            }
            _dbContext.SaveChanges();
        }

        //get applicationworkflow (onboarding type) status by personid -> employeeid
        public ApplicationWorkFlow GetApplicationStatus(int pid)
        {
            var person = _dbContext.Persons.Where(p => p.Id == pid).Include(p => p.Employee).FirstOrDefault();
            var res = new ApplicationWorkFlow();
            if (person != null && person.Employee != null)
            {
                int eid = person.Employee.Id;
                var application = _dbContext.ApplicationWorkFlows.Where(x => x.EmployeeId == eid && x.Type == "OnBoarding").FirstOrDefault();
                if (application != null && application.Status != null)
                    return application;
            }
            return res;
        }

        //change onboarding application status: rejected -> pending
        public void ChangeApplicationStatus(int pid)
        {
            var person = _dbContext.Persons.Where(p => p.Id == pid).Include(p => p.Employee).FirstOrDefault();

            if (person != null && person.Employee != null)
            {
                int eid = person.Employee.Id;
                var application = _dbContext.ApplicationWorkFlows.Where(x => x.EmployeeId == eid && x.Type == "OnBoarding").FirstOrDefault();
                if (application != null && application.Status != null)
                {
                    application.Status = "Pending";
                    _dbContext.SaveChanges();
                }
            }
        }
    }
}

