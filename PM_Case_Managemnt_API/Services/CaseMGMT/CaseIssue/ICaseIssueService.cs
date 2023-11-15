using PM_Case_Managemnt_API.DTOS.Case;
using PM_Case_Managemnt_API.DTOS.CaseDto;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Models.CaseModel;


namespace PM_Case_Managemnt_API.Services.CaseMGMT
{
    public interface ICaseIssueService
    {

        public Task<List<CaseEncodeGetDto>> GetNotCompletedCases();

        public Task IssueCase(CaseIssueDto caseAssignDto);

        public Task<List<CaseEncodeGetDto>> GetAll(Guid? employeeId);
        public Task TakeAction(CaseIssueActionDto caseActionDto);

    }
}
