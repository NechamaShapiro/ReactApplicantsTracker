using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactApplicantsTracker.Data;

namespace ReactApplicantsTracker.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationsController : ControllerBase
    {
        private string _connectionString;
        public ApplicationsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("add")]
        [HttpPost]
        public void Add(Applicant applicant)
        {
            var repo = new ApplicationsRepository(_connectionString);
            repo.Add(applicant);
        }

        //[HttpGet]
        //[Route("get")]
        //public List<Applicant> Get(ApplicationStatus status)
        //{
        //    var repo = new ApplicationsRepository(_connectionString);
        //    return repo.GetByStatus(status);
        //}
        [HttpGet]
        [Route("getpending")]
        public List<Applicant> GetPending()
        {
            var repo = new ApplicationsRepository(_connectionString);
            return repo.GetPending();
        }

        [HttpGet]
        [Route("getaccepted")]
        public List<Applicant> GetAccepted()
        {
            var repo = new ApplicationsRepository(_connectionString);
            return repo.GetAccepted();
        }

        [HttpGet]
        [Route("getrejected")]
        public List<Applicant> GetRejected()
        {
            var repo = new ApplicationsRepository(_connectionString);
            return repo.GetRejected();
        }

        [HttpGet]
        [Route("get")]
        public Applicant GetById(int id)
        {
            var repo = new ApplicationsRepository(_connectionString);
            return repo.GetById(id);
        }

        [Route("accept")]
        [HttpPost]
        public void Accept(Applicant applicant)
        {
            var repo = new ApplicationsRepository(_connectionString);
            repo.ChangeStatusById(applicant, ApplicationStatus.Accepted);
        }
        [Route("reject")]
        [HttpPost]
        public void Reject(Applicant applicant)
        {
            var repo = new ApplicationsRepository(_connectionString);
            repo.ChangeStatusById(applicant, ApplicationStatus.Rejected);
        }

        [HttpGet]
        [Route("getcount")]
        public int GetCount(ApplicationStatus status)
        {
            var repo = new ApplicationsRepository(_connectionString);
            return repo.GetStatusCount(status);
        }
    }
}
