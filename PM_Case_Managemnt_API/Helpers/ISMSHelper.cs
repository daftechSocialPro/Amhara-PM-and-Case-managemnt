using PM_Case_Managemnt_API.Models.CaseModel;

namespace PM_Case_Managemnt_API.Helpers
{
    public interface ISMSHelper
    {
        public Task<bool> MessageSender(string reciver, string message, string UserId, Guid? orgId = null);
        public Task<bool> UnlimittedMessageSender(string reciver, string message, string UserId, Guid? orgId = null);
        public Task<bool> SendSmsForCase(string message, Guid caseId, Guid caseHistoryId, string userId, MessageFrom messageFrom);

    }
}
