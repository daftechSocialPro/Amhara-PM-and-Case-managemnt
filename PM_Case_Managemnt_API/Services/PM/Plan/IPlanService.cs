
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.DTOS.PM;
using PM_Case_Managemnt_API.Helpers;
using PM_Case_Managemnt_API.Models.PM;
namespace PM_Case_Managemnt_API.Services.PM.Plan
{
    public interface IPlanService
    {
        public Task<ResponseMessage<int>> CreatePlan(PlanDto plan);

        public Task<ResponseMessage<List<PlanViewDto>>> GetPlans(Guid? programId, Guid SubOrgId);

        public Task<ResponseMessage<List<SelectListDto>>> GetPlansSelectList(Guid ProgramId);

        public Task<ResponseMessage<PlanSingleViewDto>> GetSinglePlan(Guid planId);
        Task<ResponseMessage> UpdatePlan(PlanDto plan);
        Task<ResponseMessage> DeletePlan(Guid planId);
        //public Task<int> UpdatePrograms(Programs Programs);
        //public Task<List<ProgramDto>> GetPrograms();
        //public Task<List<SelectListDto>> GetProgramsSelectList();
    }
}
