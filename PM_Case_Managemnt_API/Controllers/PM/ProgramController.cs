using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.DTOS.PM;
using PM_Case_Managemnt_API.Models.PM;
using PM_Case_Managemnt_API.Services.Common;
using PM_Case_Managemnt_API.Services.PM;


namespace PM_Case_Managemnt_API.Controllers.PM
{
    [Route("api/PM/[controller]")]
    [ApiController]
    public class ProgramController : ControllerBase
    {
        private readonly IProgramService _programService;
        public ProgramController(IProgramService programService)
        {
            _programService = programService;
        }

        [HttpPost]
        public IActionResult Create([FromBody] Programs program)
        {
            try
            {
                var response = _programService.CreateProgram(program);
                return Ok(new { response });

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }
        [HttpGet]

        public async Task<List<ProgramDto>> GetPrograms(Guid subOrgId)
        {
            var response = await _programService.GetPrograms(subOrgId);
            return response;
        }
        [HttpGet("selectlist")]
        public async Task<List<SelectListDto>> GetProgramsSelectList(Guid subOrgId)
        {
            var response = await _programService.GetProgramsSelectList(subOrgId);
            return response;
        }

        [HttpGet("id")]

        public async Task<ProgramDto> GetProgramById(Guid programId)
        {
            var response = await _programService.GetProgramsById(programId);
            return response;
        }
    }
}
