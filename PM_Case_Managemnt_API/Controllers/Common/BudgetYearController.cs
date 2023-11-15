
using Microsoft.AspNetCore.Mvc;
using PM_Case_Managemnt_API.DTOS.Common;

using PM_Case_Managemnt_API.Models.Common;
using PM_Case_Managemnt_API.Services.Common;



namespace PM_Case_Managemnt_API.Controllers.Common
{
    [Route("api/[controller]")]
    [ApiController]
    public class BudgetYearController : ControllerBase
    {
        private readonly IBudgetyearService _budgetyearService;
        public BudgetYearController(IBudgetyearService budgetyearService)
        {

            _budgetyearService = budgetyearService;

        }



        [HttpPost]

        public IActionResult Create([FromBody] ProgramBudgetYear programBudgetYear)
        {
            try
            {

                var response = _budgetyearService.CreateProgramBudgetYear(programBudgetYear);
                return Ok(new { response });

            }

            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }
        [HttpGet]

        public async Task<List<ProgramBudgetYear>> GetProgramBudgetYears()
        {
            return await _budgetyearService.GetProgramBudgetYears();
        }

        [HttpGet("programbylist")]

        public async Task<List<SelectListDto>> GetProgramBudgetYearList()
        {
            return await _budgetyearService.getProgramBudgetSelectList();
        }

        [HttpPost("budgetyear")]

        public IActionResult Create([FromBody] BudgetYearDto budgetYear)
        {
            try
            {
                var response = _budgetyearService.CreateBudgetYear(budgetYear);
                return Ok(new { response });

            }

            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }
        [HttpGet("budgetyear")]

        public async Task<List<BudgetYearDto>> GetBudgetYears(Guid programBudgetYearId)
        {
            return await _budgetyearService.GetBudgetYears(programBudgetYearId);
        }

        [HttpGet("budgetbylist")]

        public async Task<List<SelectListDto>> GetBudgetYearList()
        {
            return await _budgetyearService.getProgramBudgetSelectList();
        }
        [HttpGet("budgetyearbyprogramid")]

        public async Task<List<SelectListDto>> GetBudgetYearByProgramId(Guid programId)
        {
            return await _budgetyearService.GetBudgetYearsFromProgramId(programId);
        }

    }
}
