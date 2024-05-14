using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PM_Case_Managemnt_API.Services.KPI;

namespace PM_Case_Managemnt_API.Controllers.KPI
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class KPIController : ControllerBase
    {
        private readonly IKPIService _kpiService;

        public KPIController(IKPIService kpiService)
        {
            _kpiService = kpiService;
        }

        [HttpGet]
        public async Task<IActionResult> GetKPIs()
        {
            return Ok(await _kpiService.GetKPIs());
        }

        [HttpGet]
        
    }
}
