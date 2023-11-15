using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PM_Case_Managemnt_API.DTOS.PM;
using PM_Case_Managemnt_API.Models.PM;
using PM_Case_Managemnt_API.Services.PM;
using PM_Case_Managemnt_API.Services.PM.Plan;
using PM_Case_Managemnt_API.Services.PM.Program;

namespace PM_Case_Managemnt_API.Controllers.PM
{
    [Route("api/PM/[controller]")]
    [ApiController]
    public class PlanController : ControllerBase
    {

        private readonly IPlanService _planService;
        public PlanController(IPlanService planService)
        {
            _planService = planService;
        }

        [HttpPost]
        public IActionResult Create([FromBody] PlanDto plan)
        {
            try
            {
                var response = _planService.CreatePlan(plan);
                return Ok(new { response });

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }

        [HttpGet]

        public async Task<List<PlanViewDto>> Getplan(Guid? programId)
        {
            var response = await _planService.GetPlans(programId);
            return response;
        }

        [HttpGet("getbyplanid")]

        public async Task<PlanSingleViewDto> GetPlan(Guid planId)
        {
            var response = await _planService.GetSinglePlan(planId);

            return response;
        }


        [HttpGet("getByProgramIdSelectList")]

        public async Task<IActionResult> GetBYPromgramIdSelectList(Guid ProgramId)
        {
            try
            {
                return Ok(await _planService.GetPlansSelectList(ProgramId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }


    }
}
