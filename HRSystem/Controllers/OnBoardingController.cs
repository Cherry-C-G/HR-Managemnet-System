using HRSystem.DAO;
using HRSystem.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HRSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OnBoardingController:ControllerBase
    {
        private readonly OnBoardingDAO _onBoardingDAO;

        public OnBoardingController(OnBoardingDAO onBoardingDAO) {
            _onBoardingDAO= onBoardingDAO;
        }

        //actions

        //test case 1
        [HttpGet("GetAllPeople")]
        public IActionResult GetAllPeople()
        {
            _ = new List<Person>();
            try
            {
                List<Person> people = _onBoardingDAO.GetAllPeople();
                return Ok(people);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //test case 2
        [HttpGet("GetUsers")]
        public IActionResult GetAllUsers()
        {
            //_ = new List<Person>();
            try
            {
                List<User> people = _onBoardingDAO.GetUsers();
                return Ok(people);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Sync Action test
        [HttpPost("Form")]
        public async Task<IActionResult> AddForm([FromBody] Person person)
        {
            int personId = Convert.ToInt32(User.FindFirstValue("PersonId"));
            person.Id = personId;
            if(person.Employee is not null)
            {
                person.Employee.PersonId = personId;
            }
            if (person.ContactList is not null && person.ContactList.Count > 0)
            {
                foreach(var contact in person.ContactList)
                {
                    contact.PersonId= personId;
                }
            }
            await _onBoardingDAO.InsertForm(person);
            return Ok(new {message="Form insert succeed"});
        }

        [HttpGet("GetInfo")]
        public async Task<IActionResult> GetInfo() {

            var personId = Convert.ToInt32(User.FindFirstValue("PersonId"));

            var person = await _onBoardingDAO.GetPersonById(personId);

            if(person == null) {
                return BadRequest(new {message="Person not found" });
            }

            return Ok (new {person.Firstname, person.Lastname, person.Email});
        }

    }
}
