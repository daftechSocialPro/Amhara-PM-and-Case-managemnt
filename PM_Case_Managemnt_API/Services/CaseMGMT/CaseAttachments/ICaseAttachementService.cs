using PM_Case_Managemnt_API.Models.CaseModel;

namespace PM_Case_Managemnt_API.Services.CaseMGMT.CaseAttachments
{
    public interface ICaseAttachementService
    {
        public Task AddMany(List<CaseAttachment> caseAttachments);
        public Task<List<CaseAttachment>> GetAll(string CaseId = null);

        public bool RemoveAttachment(Guid attachmentId);
    }
}
