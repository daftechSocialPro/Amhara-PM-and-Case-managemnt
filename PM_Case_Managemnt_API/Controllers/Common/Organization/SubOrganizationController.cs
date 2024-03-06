using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.DTOS.Common.Organization;
using PM_Case_Managemnt_API.Models.Common;
using PM_Case_Managemnt_API.Models.Common.Organization;
using PM_Case_Managemnt_API.Services.Common;
using PM_Case_Managemnt_API.Services.Common.SubsidiaryOrganization;
using System.Net.Http.Headers;

namespace PM_Case_Managemnt_API.Controllers.Common.Organization
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubOrganizationController : ControllerBase
    {
        private readonly ISubsidiaryOrganizationService _subOrganizationService;

        public SubOrganizationController(ISubsidiaryOrganizationService subOrganzationService)
        {
            _subOrganizationService = subOrganzationService;
        }

        [HttpPost]

        public IActionResult Create([FromBody] SubOrgDto subOrg)
        {
            try
            {
                var response = _subOrganizationService.CreateSubsidiaryOrganization(subOrg);
                return Ok(new { response });
            }

            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }

        [HttpGet]

        public async Task<List<SubsidiaryOrganization>> getSubsidiaryOrganization()
        {
            return await _subOrganizationService.GetSubsidiaryOrganization();
        }

        [HttpGet("ById")]

        public async Task<SubsidiaryOrganization> getSubsidiaryOrganizationById(Guid subOrgId)
        {
            return await _subOrganizationService.GetSubsidiaryOrganizationById(subOrgId);
        }

        [HttpPut, DisableRequestSizeLimit]
        public async Task<IActionResult> Update(SubOrgDto subOrg)
        {
            try
            {
                return Ok(await _subOrganizationService.UpdateSubsidiaryOrganization(subOrg));
            }

            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }

        [HttpDelete, DisableRequestSizeLimit]
        public async Task<IActionResult> Delete(Guid suborgId)
        {
            try
            {
                return Ok(await _subOrganizationService.DeleteSubsidiaryOrganization(suborgId));
            }

            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }

        [HttpGet("selectlist")]

        public async Task<List<SelectListDto>> GetSubsidiaryOrganizationSelectList()
        {

            return await _subOrganizationService.GetSubOrgSelectList();
        }

    }
}
