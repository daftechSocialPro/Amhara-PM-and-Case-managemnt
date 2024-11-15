using Microsoft.AspNetCore.Mvc;
using PM_Case_Managemnt_API.DTOS.KPI;
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
        public async Task<IActionResult> GetKPIById(Guid id)
        {
            return Ok(await _kpiService.GetKPIById(id));
        }

        [HttpPost]
        public async Task<IActionResult> AddKPI(KPIPostDto kpiPost)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _kpiService.AddKPI(kpiPost));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddKPIDetail(KPIDetailsPostDto kpiDetailsPost)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _kpiService.AddKPIDetail(kpiDetailsPost));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddKPIData(KPIDataPostDto kpiDataPost)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _kpiService.AddKPIData(kpiDataPost));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateKPI(KPIGetDto kpiGet)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _kpiService.UpdateKPI(kpiGet));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteKPI(Guid kpiId)
        {
            return Ok(await _kpiService.DeleteKPI(kpiId));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateKPIDetail(KPIDetailsGetDto kpiDetailsGet)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _kpiService.UpdateKPIDetail(kpiDetailsGet));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteKPIDetail(Guid kpiDetailId)
        {
            return Ok(await _kpiService.DeleteKPIDetail(kpiDetailId));
        }

        [HttpGet]
        public async Task<IActionResult> LoginToKpi(string accessCode)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _kpiService.LoginKpiDataEncoding(accessCode));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetKpiGoalSelectList(Guid subOrgId)
        {
            return Ok(await _kpiService.GetKpiGoalSelectList(subOrgId));
        }

        [HttpPost]
        public async Task<IActionResult> AddKpiGoal(KPIGoalPostDto kpiGoalPost)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _kpiService.AddKpiGoal(kpiGoalPost));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetKpiSeventyById(Guid id, string? date)
        {
            return Ok(await _kpiService.GetKpiSeventyById(id, date));
        }

        [HttpGet]
        public async Task<IActionResult> GetKpiDetailForEdit(Guid goalId)
        {
            return Ok(await _kpiService.GetKpiDetailForEdit(goalId));
        }
    }
}
