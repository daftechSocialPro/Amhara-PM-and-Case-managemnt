using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PM_Case_Managemnt_API.DTOS.Case;
using PM_Case_Managemnt_API.Models.CaseModel;

namespace PM_Case_Managemnt_API.Services.CaseMGMT.CaseMessagesService
{
    public interface ICaseMessagesService
    {
        public Task Add(CaseMessagesPostDto caseMessagesPost);
        public Task<List<CaseUnsentMessagesGetDto>> GetMany(Guid subOrgId, bool MessageStatus);
        public Task SendMessages(List<CaseUnsentMessagesGetDto> Messages);
    }
}
