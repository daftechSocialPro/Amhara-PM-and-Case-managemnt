﻿using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Helpers;

namespace PM_Case_Managemnt_API.Services.Common.SmsTemplate
{
    public interface ISmsTemplateService
    {
        public Task<List<SmsTemplateGetDto>> GetSmsTemplates(Guid subOrgId);
        public Task<SmsTemplateGetDto> GetSmsTemplatebyId(Guid id);
        public Task<List<SelectListDto>> GetSmsTemplateSelectList(Guid subOrgId);
        public Task<ResponseMessage> CreateSmsTemplate(SmsTemplatePostDto smsTemplate);
        public Task<ResponseMessage> UpdateSmsTemplate(SmsTemplateGetDto smsTemplate);
        public Task<ResponseMessage> DeleteSmsTemplate(Guid id);

    }
}
