using PM_Case_Managemnt_API.DTOS.Common.Analytics;
using System.Threading.Tasks;

namespace PM_Case_Managemnt_API.Services.Common.Analytics
{
    public interface IAnalyticsService
    {
        public Task<SubOrgsPlannedandusedBudgetDtos> GetOverallBudget();

    }
}
