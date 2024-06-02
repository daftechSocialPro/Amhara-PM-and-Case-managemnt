using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Helpers;
using PM_Case_Managemnt_API.Models.Common;

namespace PM_Case_Managemnt_API.Services.Common
{
    public interface IBudgetyearService
    {
        //Program Budget Year
        Task<ResponseMessage> CreateProgramBudgetYear(ProgramBudgetYearDto programBudgetYear);

        Task<ResponseMessage> EditProgramBudgetYear(ProgramBudgetYearDto programBudgetYear);

        Task<ResponseMessage> DeleteProgramBudgetYear(Guid programBudgetYeatId);
        Task<ResponseMessage<List<ProgramBudgetYear>>> GetProgramBudgetYears(Guid subOrgId);
        Task<ResponseMessage<List<SelectListDto>>> getProgramBudgetSelectList(Guid subOrgId);


        // Budget Year
        Task<ResponseMessage> CreateBudgetYear(BudgetYearDto BudgetYear);
        Task<ResponseMessage> EditBudgetYear(BudgetYearDto BudgetYear);
        Task<ResponseMessage> DeleteBudgetYear(Guid budgetYearId);
        Task<ResponseMessage<List<BudgetYearDto>>> GetBudgetYears(Guid programBudgetYearId);
        Task<ResponseMessage<List<SelectListDto>>> GetBudgetYearsFromProgramId(Guid ProgramId);
    }
}
