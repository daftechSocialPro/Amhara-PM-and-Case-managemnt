using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PM_Case_Managemnt_API.DTOS.Case;
using PM_Case_Managemnt_API.Models.CaseModel;

namespace PM_Case_Managemnt_API.Services.CaseMGMT.CaseMessagesService
{
    public interface ICaseMessagesService
    {
        public Task<ResponseMessage<string>> Add(CaseMessagesPostDto caseMessagesPost);
        public Task<ResponseMessage<List<CaseUnsentMessagesGetDto>>> GetMany(Guid subOrgId, bool MessageStatus);
        public Task<ResponseMessage<string>> SemdMessages(List<CaseUnsentMessagesGetDto> Messages);
    }
}
