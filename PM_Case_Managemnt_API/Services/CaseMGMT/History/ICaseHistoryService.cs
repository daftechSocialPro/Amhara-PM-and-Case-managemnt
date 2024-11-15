using PM_Case_Managemnt_API.DTOS.CaseDto;

namespace PM_Case_Managemnt_API.Services.CaseMGMT.History
{
    public interface ICaseHistoryService
    {
        public Task Add(CaseHistoryPostDto caseHistoryPost);
        public Task SetCaseSeen(CaseHistorySeenDto seenDto);
        public Task CompleteCase(CaseHistoryCompleteDto completeDto);
        public Task<List<CaseEncodeGetDto>> GetCaseHistory(Guid EmployeeId, Guid CaseHistoryId);
    }
}
