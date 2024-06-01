using Azure;
using PM_Case_Managemnt_API.DTOS.CaseDto;

namespace PM_Case_Managemnt_API.Services.CaseMGMT.History
{
    public interface ICaseHistoryService
    {
        public Task<ResponseMessage<int>> Add(CaseHistoryPostDto caseHistoryPost);
        public Task<ResponseMessage<int>> SetCaseSeen(CaseHistorySeenDto seenDto);
        public Task<ResponseMessage<int>> CompleteCase(CaseHistoryCompleteDto completeDto);
        public Task<ResponseMessage<List<CaseEncodeGetDto>>> GetCaseHistory(Guid EmployeeId, Guid CaseHistoryId);
    }
}
