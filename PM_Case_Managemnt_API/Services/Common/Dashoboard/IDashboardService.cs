using PM_Case_Managemnt_API.DTOS.Case;
using static PM_Case_Managemnt_API.Services.Common.Dashoboard.DashboardService;

namespace PM_Case_Managemnt_API.Services.Common.Dashoboard
{
    public interface IDashboardService
    {

        public  Task<DashboardDto> GetPendingCase(string startat, string endat);
        public Task<barChartDto> GetMonthlyReport();

        public Task<PMDashboardDto> GetPMDashboardDto(Guid empID);

        public Task<PmDashboardBarchartDto> BudgetYearVsContribution(Guid empID);


    }
}
