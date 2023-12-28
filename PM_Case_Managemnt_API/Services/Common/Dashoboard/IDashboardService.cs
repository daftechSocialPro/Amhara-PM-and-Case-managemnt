using PM_Case_Managemnt_API.DTOS.Case;
using static PM_Case_Managemnt_API.Services.Common.Dashoboard.DashboardService;

namespace PM_Case_Managemnt_API.Services.Common.Dashoboard
{
    public interface IDashboardService
    {

        public  Task<DashboardDto> GetPendingCase(Guid subOrgId, string startat, string endat);
        public Task<barChartDto> GetMonthlyReport(Guid subOrgId);

        public Task<PMDashboardDto> GetPMDashboardDto(Guid empID, Guid subOrgId);

        public Task<PmDashboardBarchartDto> BudgetYearVsContribution(Guid empID, Guid subOrgId);


    }
}
