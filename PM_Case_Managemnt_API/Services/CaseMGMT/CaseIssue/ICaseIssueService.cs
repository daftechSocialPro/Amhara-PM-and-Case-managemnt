using PM_Case_Managemnt_API.DTOS.Case;
using PM_Case_Managemnt_API.DTOS.CaseDto;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Models.CaseModel;


namespace PM_Case_Managemnt_API.Services.CaseMGMT
{
    public interface ICaseIssueService
    {

        public Task<ResponseMessage<List<CaseEncodeGetDto>>> GetNotCompletedCases(Guid subOrgId);

        public Task<ResponseMessage<string>> IssueCase(CaseIssueDto caseAssignDto);

        public Task<ResponseMessage<List<CaseEncodeGetDto>>> GetAll(Guid? employeeId);
        public Task<ResponseMessage<string>> TakeAction(CaseIssueActionDto caseActionDto);

    }
}
