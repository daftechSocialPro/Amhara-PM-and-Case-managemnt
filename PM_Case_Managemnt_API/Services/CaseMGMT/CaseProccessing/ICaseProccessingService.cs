using PM_Case_Managemnt_API.DTOS.CaseDto;

namespace PM_Case_Managemnt_API.Services.CaseMGMT
{
    public interface ICaseProccessingService
    {

        public Task<int> ConfirmTranasaction(ConfirmTranscationDto confirmTranscationDto);
        public Task<int> AssignTask(CaseAssignDto caseAssignDto);
        public Task<int> CompleteTask(CaseCompleteDto caseCompleteDto);
        public Task<int> RevertTask(CaseRevertDto revertAffair);
        public Task<int> TransferCase(CaseTransferDto caseTransferDto);
        public Task<int> AddToWaiting(Guid caseHistoryId);
        public Task<CaseEncodeGetDto> GetCaseDetial(Guid historyId, Guid employeeId);

        public Task<int> SendSMS(CaseCompleteDto smsdetail);


        public Task<int> ArchiveCase(ArchivedCaseDto archivedCaseDto);
        public Task<CaseState> GetCaseState(Guid CaseTypeId, Guid caseHistoryId);

        public Task<bool> Ispermitted(Guid employeeId, Guid caseId);
    }
}
