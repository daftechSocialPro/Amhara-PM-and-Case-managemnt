using PM_Case_Managemnt_API.DTOS.CaseDto;

namespace PM_Case_Managemnt_API.Services.CaseMGMT
{
    public interface ICaseProccessingService
    {

        public Task<int> ConfirmTranasaction(ConfirmTranscationDto confirmTranscationDto);
        public Task AssignTask(CaseAssignDto caseAssignDto);
        public Task CompleteTask(CaseCompleteDto caseCompleteDto);
        public Task RevertTask(CaseRevertDto revertAffair);
        public Task TransferCase(CaseTransferDto caseTransferDto);
        public Task AddToWaiting(Guid caseHistoryId);
        public Task<CaseEncodeGetDto> GetCaseDetial(Guid historyId, Guid employeeId);

        public Task SendSMS(CaseCompleteDto smsdetail);


        public Task<int> ArchiveCase(ArchivedCaseDto archivedCaseDto);
        public Task<CaseState> GetCaseState(Guid CaseTypeId, Guid caseHistoryId);

        public Task<bool> Ispermitted(Guid employeeId, Guid caseId);
    }
}
