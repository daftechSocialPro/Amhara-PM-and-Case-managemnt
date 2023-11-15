using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PM_Case_Managemnt_API.DTOS.CaseDto;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Models.CaseModel;
using PM_Case_Managemnt_API.Services.CaseService.CaseTypes;

namespace PM_Case_Managemnt_API.Controllers.Case
{
    [Route("api/case")]
    [ApiController]
    public class CaseTypeController : ControllerBase
    {
        private readonly ICaseTypeService _caseTypeService;

        public CaseTypeController(ICaseTypeService caseTypeService)
        {
            _caseTypeService = caseTypeService;
        }

        [HttpGet("type")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _caseTypeService.GetAll());
            } catch(Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost("type")]
        public async Task<IActionResult> Create(CaseTypePostDto caseType)
        {
            try
            {
                await _caseTypeService.Add(caseType);
                return NoContent();
            } catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpGet("typeSelectList")]
        public async Task<IActionResult> GetSelectList()
        {
            try
            {
               
                return Ok(await _caseTypeService.GetAllSelectList());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("byCaseForm")]
        public async Task<IActionResult> GetALlBYCaseForm(string caseForm)
        {
            try
            {

                return Ok(await _caseTypeService.GetAllByCaseForm(caseForm));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpGet("fileSettingsByCaseTypeId")]

        public async Task<IActionResult> GetFileSettingsByCaseTypeId(Guid CaseTypeId )
        {


            try
            {
                return Ok(await _caseTypeService.GetFileSettigs(CaseTypeId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }

        }


        [HttpGet("GetChildOrder")]

        public async Task<IActionResult> GetChildOrder (Guid caseTypeId)
        {

            try
            {
                return Ok( _caseTypeService.GetChildOrder(caseTypeId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }

        }

    }
}
