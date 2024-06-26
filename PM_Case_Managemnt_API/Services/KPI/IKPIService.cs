﻿using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.DTOS.KPI;
using PM_Case_Managemnt_API.Helpers;

namespace PM_Case_Managemnt_API.Services.KPI
{
    public interface IKPIService
    {
        Task<ResponseMessage> AddKPI(KPIPostDto kpiPost);
        Task<ResponseMessage> AddKPIDetail(KPIDetailsPostDto kpiDetailsPost);
        Task<ResponseMessage> AddKPIData(KPIDataPostDto kpiDataPost);
        Task<List<KPIGetDto>> GetKPIs();
        Task<KPIGetDto> GetKPIById(Guid id);
        Task<ResponseMessage> UpdateKPI(KPIGetDto kpiGet);
        Task<ResponseMessage> UpdateKPIDetail(KPIDetailsGetDto kpiDetailsGet);
        Task<ResponseMessage> LoginKpiDataEncoding(string accessCode);

        Task<ResponseMessage> AddKpiGoal(KPIGoalPostDto kpiGoalPost);
        Task<List<SelectListDto>> GetKpiGoalSelectList(Guid subOrgId);
    }
}
