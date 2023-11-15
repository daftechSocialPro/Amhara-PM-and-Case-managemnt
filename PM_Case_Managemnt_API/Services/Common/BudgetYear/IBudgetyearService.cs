using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Models.Common;

namespace PM_Case_Managemnt_API.Services.Common
{
    public interface IBudgetyearService
    {
        //Program Budget Year
        public Task<int> CreateProgramBudgetYear(ProgramBudgetYear programBudgetYear);

        //public Task<int> UpdateOrganizationalProfile(OrganizationProfile organizationProfile);
        public Task<List<ProgramBudgetYear>> GetProgramBudgetYears();

        public Task<List<SelectListDto>> getProgramBudgetSelectList();


        // Budget Year
        public Task<int> CreateBudgetYear(BudgetYearDto budgetYear);

        //public Task<int> UpdateOrganizationalProfile(OrganizationProfile organizationProfile);
        public Task<List<BudgetYearDto>> GetBudgetYears(Guid programBudgetYearId);

        public Task<List<SelectListDto>> GetBudgetYearsFromProgramId(Guid ProgramId);
        public Task<List<SelectListDto>> getBudgetSelectList();
    }
}
