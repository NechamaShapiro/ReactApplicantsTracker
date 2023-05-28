using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactApplicantsTracker.Data
{
    public class ApplicationsRepository
    {
        private string _connectionString;

        public ApplicationsRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void Add(Applicant applicant)
        {
            using var context = new ApplicationsContext(_connectionString);
            context.Applicants.Add(applicant);
            context.SaveChanges();
        }
        //public List<Applicant> GetByStatus(ApplicationStatus status)
        //{
        //    using var context = new ApplicationsContext(_connectionString);
        //    return context.Applicants.Where(a => a.ApplicationStatus == status).ToList();
        //}
        public List<Applicant> GetPending()
        {
            using var context = new ApplicationsContext(_connectionString);
            return context.Applicants.Where(a => a.ApplicationStatus == ApplicationStatus.Pending).ToList();
        }
        public List<Applicant> GetAccepted()
        {
            using var context = new ApplicationsContext(_connectionString);
            return context.Applicants.Where(a => a.ApplicationStatus == ApplicationStatus.Accepted).ToList();
        }
        public List<Applicant> GetRejected()
        {
            using var context = new ApplicationsContext(_connectionString);
            return context.Applicants.Where(a => a.ApplicationStatus == ApplicationStatus.Rejected).ToList();
        }
        public Applicant GetById(int id)
        {
            using var context = new ApplicationsContext(_connectionString);
            return context.Applicants.First(a => a.Id == id);
        }
        public void ChangeStatusById(Applicant applicant, ApplicationStatus newStatus)
        {
            using var context = new ApplicationsContext(_connectionString);
            var foundApplicant = context.Applicants.Find(applicant.Id);
            if (foundApplicant != null)
            {
                foundApplicant.ApplicationStatus = newStatus;
                context.SaveChanges();
            }
        }
        public int GetStatusCount(ApplicationStatus status)
        {
            using var context = new ApplicationsContext(_connectionString);
            return context.Applicants.Where(a => a.ApplicationStatus == status).Count();
        }
    }
}
