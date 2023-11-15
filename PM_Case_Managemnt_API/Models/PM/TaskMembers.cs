
using PM_Case_Managemnt_API.Models.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace PM_Case_Managemnt_API.Models.PM
{
    public class TaskMembers : CommonModel
    {
        public Guid? TaskId { get; set; }
        public virtual Task Task { get; set; } = null!;
        public Guid? PlanId { get; set; }
        public virtual Plan Plan { get; set; } = null!;
        public Guid? ActivityParentId { get; set; }
        public virtual ActivityParent ActivityParent { get; set; } = null!;
        public Guid EmployeeId { get; set; }
        public virtual Employee Employee { get; set; } = null!;
    }
}
