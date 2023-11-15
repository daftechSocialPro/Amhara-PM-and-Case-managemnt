using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PM_Case_Managemnt_API.DTOS.CaseDto;
using PM_Case_Managemnt_API.Services.CaseService.FileSettings;

namespace PM_Case_Managemnt_API.Controllers.Case
{
    [Route("api/case")]
    [ApiController]
    public class FileSettingController : ControllerBase
    {
        private readonly IFileSettingsService _fileSettingsService;

        public FileSettingController(IFileSettingsService fileSettingsService)
        {
            _fileSettingsService = fileSettingsService;
        }
        [HttpGet("fileSetting")]
        public async Task<IActionResult> GetAll()
        {
            try { 
                return Ok(await _fileSettingsService.GetAll());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost("fileSetting")]
        public async Task<IActionResult> PostFileSetting(FileSettingPostDto fileSettingPostDto)
        {
            try
            {
                await _fileSettingsService.Add(fileSettingPostDto);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
