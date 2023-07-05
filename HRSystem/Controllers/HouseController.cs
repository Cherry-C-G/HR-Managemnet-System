using HRSystem.DAO;
using HRSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Diagnostics;
using HRSystem.DTO;
using System.Security.Claims;

namespace HRSystem.Controllers
{
    [ApiController]
    //[Route("/House")]
    public class HouseController : ControllerBase
    {
        private readonly ILogger<HouseController> _logger;

        private readonly HRDbContext _dbContext;
        private readonly HouseDAO _houseDAO;


        public HouseController(ILogger<HouseController> logger, HRDbContext dbContext, HouseDAO houseDAO)
        {
            _logger = logger;

            _dbContext = dbContext;

            _houseDAO = houseDAO;
        }

        //-------------------Employee--------------------//

        // Get House Detail
        [HttpGet("/houseDetail")]
        public List<HouseDetail> gethouseDetail()
        {
            return _houseDAO.viewHouseDetail();
        }

        // Add Facility Report
        [HttpPost("/addReport")]
        public ActionResult<CreateFacilityReport> createReport([FromBody] CreateFacilityReport createFacilityReport)
        {
            var pid = Convert.ToInt32(User.FindFirstValue("PersonId"));
            _houseDAO.sendReport(createFacilityReport, pid);
            return Ok(createFacilityReport);
        }

        // View History Report by Employee ID
        [HttpGet("/viewHistoryReportById")]
        public List<FacilityReport> viewHistoryReportById()
        {
            var pid = Convert.ToInt32(User.FindFirstValue("PersonId"));
            return _houseDAO.viewReportById(pid);
        }

        //Comment for both Employee and HR//

        //View Comments by ReportID
        [HttpGet("/viewComment/{id:int}")]
        public ActionResult viewComment([FromRoute] int id)
        {
            var result = _houseDAO.getComment(id);
            return Ok(result);
        }

        //Add Comments by ReportID
        [HttpPost("/addComment/{id:int}")]
        public ActionResult<CreateFacilityDetail> createComment([FromBody] CreateFacilityDetail createFacilityDetail, [FromRoute] int id)
        {
            var pid = Convert.ToInt32(User.FindFirstValue("PersonId"));

            _houseDAO.addComment(createFacilityDetail, id, pid);

            return Ok(createFacilityDetail);
        }

        //Edit Comments by ReportID
        [HttpPost("/editComment/{id:int}")]
        public ActionResult<CreateFacilityDetail> editComment([FromBody] CreateFacilityDetail createFacilityDetail, [FromRoute] int id)
        {
            _houseDAO.updateComment(createFacilityDetail, id);
            return Ok(createFacilityDetail);
        }

        //----------------------HR--------------------------//

        // [HR] View House Detail
        [HttpGet("/houseDetailHR")]
        public List<HouseDetailHR> gethouseDetailHR()
        {
            return _houseDAO.viewHouseDetailHR();
        }

        //[HR] Add House
        [HttpPost("/addHouse")]
        public ActionResult<House> createHouse([FromBody] House house)
        {
            _houseDAO.addHouse(house);
            return Ok(house);
        }

        //[HR] Delete House by HouseID
        [HttpDelete("/deleteHouse/{id:int}")]
        public ActionResult<House> deleteHouse([FromRoute] int id)
        {
            _houseDAO.removeHouse(id);
            return Ok("House " + id + " Removed");
        }

        // [HR] View Facility Detail by HouseID
        [HttpGet("/facilityDetailHR/{id:int}")]
        public List<Facility> getFacilityDetailHR(int id)
        {
            return _houseDAO.viewFacilityDetailHR(id);
        }

        // [HR] View Employee by HouseID
        [HttpGet("/viewEmployeeHR/{id:int}")]
        public List<EmployeeHouseHR> getEmployeeHR(int id)
        {
            return _houseDAO.viewEmployeeHR(id);
        }


        // [HR] View History Report by HouseID
        [HttpGet("/viewHistoryReportByIdHR/{id:int}")]
        public List<FacilityReport> viewHistoryReportByIdHR(int id)
        {
            return _houseDAO.viewReportByIdHR(id);
        }

        
    }
}

