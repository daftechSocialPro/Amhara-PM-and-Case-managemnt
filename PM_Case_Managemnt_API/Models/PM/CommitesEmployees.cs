
using PM_Case_Managemnt_API.Models.Common;

namespace PM_Case_Managemnt_API.Models.PM
{
    public class CommitesEmployees : CommonModel
    {
        public Guid CommiteeId { get; set; }
        public virtual Commitees Commitee { get; set; } = null!;
        public Guid EmployeeId { get; set; }
        public virtual Employee Employee { get; set; } = null!;
        public ComiteeEmployeeStatus CommiteeEmployeeStatus { get; set; }
    }
    public enum ComiteeEmployeeStatus
    {
        nominated,
        approved,
        rejected
    }
}
