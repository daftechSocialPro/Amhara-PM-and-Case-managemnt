
using PM_Case_Managemnt_API.Models.Common;
using PM_Case_Managemnt_API.Models.Common.Organization;

namespace PM_Case_Managemnt_API.Models.PM
{
   public class Programs : CommonModel
    {

        public string ProgramName { get; set; } = null!;  
        public float ProgramPlannedBudget { get; set; }
        public Guid ProgramBudgetYearId { get; set; }
        public virtual ProgramBudgetYear? ProgramBudgetYear { get; set; }
        public virtual SubsidiaryOrganization? SubsidiaryOrganization { get; set; }
        public Guid SubsidiaryOrganizationId { get; set; }
        
        
    }
}
