using System;
using HRSystem.Models;
using HRSystem.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Diagnostics;
using System.Security.Cryptography;

namespace HRSystem.DAO
{
    public class HouseDAO
    {
        private readonly HRDbContext _dbContext;

        public HouseDAO(HRDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        //-------------------Employee--------------------//

        // Get House Detail
        public List<HouseDetail> viewHouseDetail()
        {
            var set = (from Employee in _dbContext.Employees
                       join Person in _dbContext.Persons on Employee.PersonId equals Person.Id
                       join House in _dbContext.Houses on Employee.HouseId equals House.ID
                       select new HouseDetail
                       {
                           HouseAddress = House.Address,
                           PreferredName = Person.Firstname,
                           Phone = Person.CellPhone
                       }).ToList();
            return set;
        }

        // Add Facility Report
        public void sendReport(CreateFacilityReport createFacilityReport, int pid)
        {
            // report：Title + Description
            FacilityReport facilityReport = new FacilityReport();

            facilityReport.Title = createFacilityReport.Title;
            facilityReport.Description = createFacilityReport.Description;
            facilityReport.ReportDate = DateTime.Now;
            facilityReport.STATUS = "Open";


            int eid = (from Employee in _dbContext.Employees
                       join Person in _dbContext.Persons on Employee.PersonId equals Person.Id
                       where Person.Id == pid
                       select Employee.Id).FirstOrDefault();

            facilityReport.EmployeeID = eid;


            _dbContext.FacilityReports.Add(facilityReport);
            _dbContext.SaveChanges();
        }

        // View History Report by Employee ID
        public List<FacilityReport> viewReportById(int pid)
        {
            int eid = (from Employee in _dbContext.Employees
                       join Person in _dbContext.Persons on Employee.PersonId equals Person.Id
                       where Person.Id == pid
                       select Employee.Id).FirstOrDefault();

            var result = _dbContext.FacilityReports
                    .Where(r => r.EmployeeID == eid)
                    .ToList();
            return result;

        }

        //View Comments by ReportID
        public List<FacilityReportDetail> getComment(int id)
        {
            return _dbContext.FacilityReportDetails.Where(c => c.ReportID == id).ToList();
        }

        //Add Comments by ReportID
        public void addComment(CreateFacilityDetail createFacilityDetail, int id, int pid)
        {
            FacilityReportDetail facilityReportDetail = new FacilityReportDetail();

            facilityReportDetail.Comments = createFacilityDetail.Comment;

            facilityReportDetail.ReportID = id;

            int eid = (from Employee in _dbContext.Employees
                       join Person in _dbContext.Persons on Employee.PersonId equals Person.Id
                       where Person.Id == pid
                       select Employee.Id).FirstOrDefault();

            facilityReportDetail.EmployeeID = eid;
            facilityReportDetail.CreatedDate = DateTime.Now;
            facilityReportDetail.LastModificationDate = DateTime.Now;



            _dbContext.FacilityReportDetails.Add(facilityReportDetail);
            _dbContext.SaveChanges();
        }

        //Edit Comments by ReportID
        public void updateComment(CreateFacilityDetail createFacilityDetail, int id)
        {
            FacilityReportDetail facilityReportDetail = _dbContext.FacilityReportDetails.Where(c => c.ID == id).FirstOrDefault();

            facilityReportDetail.Comments = createFacilityDetail.Comment;
            facilityReportDetail.LastModificationDate = DateTime.Now;

            _dbContext.FacilityReportDetails.Update(facilityReportDetail);
            _dbContext.SaveChanges();
        }





        //----------------------HR--------------------------//

        // [HR] View House Detail
        public List<HouseDetailHR> viewHouseDetailHR()
        {
            var set = (from House in _dbContext.Houses
                       join Contact in _dbContext.Contacts on House.ContactID equals Contact.Id
                       join Person in _dbContext.Persons on Contact.PersonId equals Person.Id
                       select new HouseDetailHR
                       {
                           HouseID = House.ID,
                           HouseAddress = House.Address,
                           Landlord = Person.Firstname,
                           Phone = Person.CellPhone,
                           Email = Person.Email,
                           NumberOfEmployee = House.NumberOfPerson
                       }).ToList();
            return set;
        }



        //[HR] Add House
        public void addHouse(House house)
        {
            _dbContext.Houses.Add(house);
            _dbContext.SaveChanges();
        }

        //[HR] Delete House by HouseID
        public void removeHouse(int id)
        {
            House house = _dbContext.Houses.FirstOrDefault(c => c.ID == id);

            _dbContext.Houses.Remove(house);
            _dbContext.SaveChanges();
        }

        // [HR] View Facility Detail by HouseID
        public List<Facility> viewFacilityDetailHR(int id)
        {
            var result = _dbContext.Facilities.Where(f =>f.HouseID == id)
                    .ToList();
            return result;
        }

        // [HR] View Employee by HouseID
        public List<EmployeeHouseHR> viewEmployeeHR(int id)
        {
            var set = (from Employee in _dbContext.Employees
                       join Person in _dbContext.Persons on Employee.PersonId equals Person.Id
                       where Employee.HouseId ==id
                       select new EmployeeHouseHR
                       {
                           EmployeeID =Employee.Id,
                           PersonID = Employee.PersonId,
                           Name = Person.Firstname,
                           Phone = Person.CellPhone,
                           Email = Person.Email,
                           Car = Employee.Car

                       }).ToList();
            return set;
            
        }

        // [HR] View History Report by HouseID
        public List<FacilityReport> viewReportByIdHR(int id)
        {
            var rids = (from Employee in _dbContext.Employees
                       join FacilityReport in _dbContext.FacilityReports on Employee.Id equals FacilityReport.EmployeeID
                       where Employee.HouseId == id
                       select FacilityReport.ID).ToList();

            var result = _dbContext.FacilityReports
                    .Where(f => rids.Contains(f.ID))
                    .ToList();
            return result ;


        }





    }
}
