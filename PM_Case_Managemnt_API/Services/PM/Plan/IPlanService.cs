
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.DTOS.PM;
using PM_Case_Managemnt_API.Models.PM;
namespace PM_Case_Managemnt_API.Services.PM.Plan
{
    public interface IPlanService
    {
        public Task<int> CreatePlan(PlanDto plan);

        public Task<List<PlanViewDto>> GetPlans(Guid? programId);

        public Task<List<SelectListDto>> GetPlansSelectList(Guid ProgramId);

        public Task<PlanSingleViewDto> GetSinglePlan(Guid planId);
        //public Task<int> UpdatePrograms(Programs Programs);
        //public Task<List<ProgramDto>> GetPrograms();
        //public Task<List<SelectListDto>> GetProgramsSelectList();
    }
}
