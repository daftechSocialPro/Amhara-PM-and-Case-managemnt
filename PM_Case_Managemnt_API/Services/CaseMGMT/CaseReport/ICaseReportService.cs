using PM_Case_Managemnt_API.DTOS.Case;
using PM_Case_Managemnt_API.DTOS.CaseDto;
using PM_Case_Managemnt_API.Models.CaseModel;

namespace PM_Case_Managemnt_API.Services.CaseMGMT
{
    public interface ICaseReportService
    {

        public Task<List<CaseReportDto>> GetCaseReport(Guid subOrgId, string? startAt, string? endAt);
        public Task<CaseReportChartDto> GetCasePieChart(Guid subOrgId, string? startAt, string? endAt);
        public Task<CaseReportChartDto> GetCasePieCharByCaseStatus(Guid subOrgId, string? startAt, string? endAt);
        public Task<List<EmployeePerformance>> GetCaseEmployeePerformace(Guid subOrgId, string key , string OrganizationName);
        public Task<List<SMSReportDto>> GetSMSReport(Guid subOrgId, string? startAt, string? endAt);
        public Task<List<CaseDetailReportDto>> GetCaseDetail(Guid subOrgId, string key);
        public Task<CaseProgressReportDto> GetCaseProgress(Guid CaseNumber);
        public Task<ResponseMessage<List<CaseTypeGetDto>>> GetChildCaseTypes(Guid caseId);

    }
}
