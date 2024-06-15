
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

        public async Task<IActionResult> Create(ProgramBudgetYearDto programBudgetYear)
        {
            try
            {

                var response = await _budgetyearService.CreateProgramBudgetYear(programBudgetYear);
                return Ok(new { response });

            }

            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }

        [HttpPut]
        public async Task<IActionResult> EditProgramBudgetYear(ProgramBudgetYearDto programBudgetYear)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _budgetyearService.EditProgramBudgetYear(programBudgetYear));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteProgramBudgetYear(Guid programBudgetYeatId)
        {
            return Ok(await _budgetyearService.DeleteProgramBudgetYear(programBudgetYeatId));
        }
        [HttpGet]

        public async Task<List<ProgramBudgetYear>> GetProgramBudgetYears(Guid subOrgId)
        {
            var result =  await _budgetyearService.GetProgramBudgetYears(subOrgId);
            return result.Data;
        }

        [HttpGet("programbylist")]

        public async Task<List<SelectListDto>> GetProgramBudgetYearList(Guid subOrgId)
        {
            var result =  await _budgetyearService.getProgramBudgetSelectList(subOrgId);
            return result.Data;
            
        }

        [HttpPost("budgetyear")]

        public async Task<IActionResult> Create(BudgetYearDto BudgetYear)
        {
            try
            {
                var response = await _budgetyearService.CreateBudgetYear(BudgetYear);
                return Ok(new { response });

            }

            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }

        [HttpPut("editBudgetYear")]
        public async Task<IActionResult> EditBudgetYear(BudgetYearDto BudgetYear)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _budgetyearService.EditBudgetYear(BudgetYear));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("deleteBudgetYear")]
        public async Task<IActionResult> DeleteBudgetYear(Guid budgetYearId)
        {
            return Ok(await _budgetyearService.DeleteBudgetYear(budgetYearId));
        }

        [HttpGet("budgetyear")]

        public async Task<List<BudgetYearDto>> GetBudgetYears(Guid programBudgetYearId)
        {
            var result = await _budgetyearService.GetBudgetYears(programBudgetYearId);
            return result.Data;
        }

        [HttpGet("budgetbylist")]

        public async Task<List<SelectListDto>> GetBudgetYearList(Guid subOrgId)
        {
            var result = await _budgetyearService.getProgramBudgetSelectList(subOrgId);
            return result.Data;
        }
        [HttpGet("budgetyearbyprogramid")]

        public async Task<List<SelectListDto>> GetBudgetYearByProgramId(Guid programId)
        {
            var result = await _budgetyearService.GetBudgetYearsFromProgramId(programId);
            return result.Data;
        }

    }
}
