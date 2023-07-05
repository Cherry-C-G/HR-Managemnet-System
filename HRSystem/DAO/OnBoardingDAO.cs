using HRSystem.Enum;
using HRSystem.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace HRSystem.DAO
{
    public class OnBoardingDAO
    {
        private readonly HRDbContext _dbContext;

        public OnBoardingDAO(HRDbContext dbContext)
        {
            _dbContext= dbContext;
        }

        public async Task InsertForm(Person person) {

            using var transaction = _dbContext.Database.BeginTransaction();

            try
            {
                
                _dbContext.Persons.Update(person);
                await _dbContext.SaveChangesAsync();

                Models.ApplicationWorkFlow? applicationWorkFlow = _dbContext.ApplicationWorkFlows.FirstOrDefault(a => person.Employee != null && a.EmployeeId == person.Employee.Id && a.Type == WorkflowType.OnBoarding.ToString());
                if (applicationWorkFlow == null)
                {
                    _ = _dbContext.ApplicationWorkFlows.Add(new Models.ApplicationWorkFlow()
                    {
                        EmployeeId = person.Employee.Id,
                        CreatedDate = DateTime.Now,
                        Status = "Open",
                        Type = WorkflowType.OnBoarding.ToString(),
                    });
                }
                await _dbContext.SaveChangesAsync();
                transaction.Commit();
            }
            catch (Exception ex) {
                transaction.Rollback();
                Console.WriteLine(ex.Message);
                throw;
            }
        }


        //test1
        public List<Person> GetAllPeople() {
            List<Person> people = new List<Person>();

            people = _dbContext.Persons.ToList();

            return people;
        }

        //test2
        public List<User> GetUsers()
        {
            List<User> users = new List<User>();
            users = _dbContext.Users.ToList();
            return users;
        }

        public async Task<Person> GetPersonById(int personId) {
            var person =  await _dbContext.Persons.FindAsync(personId);
            return person;
            
        }

        //public string GetLastName(int userid)
        //{
        //    var personId = _dbContext.Users.Where(u => u.Id == userid).Select(u => u.Person.Id).FirstOrDefault();
        //    return _dbContext.Persons.Where(p => p.Id == personId).Select(p => p.Lastname).FirstOrDefault();

        //}

        //public string GetEmail(int userid)
        //{
        //    var personId = _dbContext.Users.Where(u => u.Id == userid).Select(u => u.Person.Id).FirstOrDefault();
        //    return _dbContext.Persons.Where(p => p.Id == personId).Select(p => p.Email).FirstOrDefault();

        //}

    }
}
