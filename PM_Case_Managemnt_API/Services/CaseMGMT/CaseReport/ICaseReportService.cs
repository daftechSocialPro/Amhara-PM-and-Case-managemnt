using PM_Case_Managemnt_API.DTOS.Case;
using PM_Case_Managemnt_API.DTOS.CaseDto;

namespace PM_Case_Managemnt_API.Services.CaseMGMT
{
    public interface ICaseReportService
    {

        public Task<List<CaseReportDto>> GetCaseReport(string? startAt, string? endAt);
        public Task<CaseReportChartDto> GetCasePieChart(string? startAt, string? endAt);
        public Task<CaseReportChartDto> GetCasePieCharByCaseStatus(string? startAt, string? endAt);
        public Task<List<EmployeePerformance>> GetCaseEmployeePerformace(string key , string OrganizationName);
        public Task<List<SMSReportDto>> GetSMSReport(string? startAt, string? endAt);
        public Task<List<CaseDetailReportDto>> GetCaseDetail(string key);
        public Task<CaseProgressReportDto> GetCaseProgress(Guid CaseNumber);

    }
}
