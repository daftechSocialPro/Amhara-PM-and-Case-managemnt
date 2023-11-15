using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.Case;
using PM_Case_Managemnt_API.Services.CaseMGMT;
using PM_Case_Managemnt_API.Services.Common.Dashoboard;

namespace PM_Case_Managemnt_API.Controllers.Common
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {

        private readonly IDashboardService _dashboardService;
        private readonly DBContext _dbContext;
        public DashboardController(IDashboardService dashboardService, DBContext dBContext)
        {
            _dashboardService = dashboardService;
            _dbContext = dBContext;
        }


        [HttpGet("GetDashboardCaseReport")]

        public async Task<IActionResult> GetDashboardCaseReport(string? startAt, string? endAt)
        {

            try
            {
                return Ok(await _dashboardService.GetPendingCase(startAt, endAt));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }

        }

        [HttpGet("GetMonthlyReportBarChart")]

        public async Task<IActionResult> GetMonthlyReportBarChart()
        {

            try
            {
                return Ok(await _dashboardService.GetMonthlyReport());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }

        }

        [HttpGet("GetPMDashboardDto")]
        public async Task<IActionResult> GetPMDashboardDto(Guid empId)
        {
            try
            {
                return Ok(await _dashboardService.GetPMDashboardDto(empId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }


        }

        [HttpGet("GetPMBarchart")]
        public async Task<IActionResult> GetPMBarchart(Guid empId)
        {
            try
            {
                return Ok(await _dashboardService.BudgetYearVsContribution(empId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }


        }





    }
}
