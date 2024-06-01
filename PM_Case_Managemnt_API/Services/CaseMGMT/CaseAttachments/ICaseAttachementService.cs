using PM_Case_Managemnt_API.Models.CaseModel;

namespace PM_Case_Managemnt_API.Services.CaseMGMT.CaseAttachments
{
    public interface ICaseAttachementService
    {
        public Task<ResponseMessage<string>> AddMany(List<CaseAttachment> caseAttachments);
        public Task<ResponseMessage<List<CaseAttachment>>> GetAll(Guid subOrgId, string CaseId = null);

        public ResponseMessage<bool> RemoveAttachment(Guid attachmentId);
    }
}
