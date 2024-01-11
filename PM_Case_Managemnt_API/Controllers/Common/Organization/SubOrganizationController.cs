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
        public IActionResult Update()
        {
            try
            {
                string dbpath = "";
                if (Request.Form.Files.Any())
                {
                    var file = Request.Form.Files[0];
                    var folderName = Path.Combine("Assets", "Organization");
                    var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                    if (!Directory.Exists(pathToSave))
                        Directory.CreateDirectory(pathToSave);

                    if (file.Length > 0)
                    {
                        var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                        var fileNameSave = Request.Form["id"] + "." + fileName.Split('.')[1];
                        var fullPath = Path.Combine(pathToSave, fileNameSave);
                        dbpath = Path.Combine(folderName, fileNameSave);

                        if (System.IO.File.Exists(fullPath))
                        {
                            System.IO.File.Delete(fullPath);
                        }

                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                    }

                }
                var subOrganizational = new SubsidiaryOrganization
                {
                    Id = Guid.Parse(Request.Form["id"]),
                    //Logo = dbpath != "" ? dbpath : Request.Form["logo"],
                    OrganizationNameEnglish = Request.Form["organizationNameEnglish"],
                    OrganizationNameInLocalLanguage = Request.Form["organizationNameInLocalLanguage"],
                    Address = Request.Form["address"],
                    PhoneNumber = Request.Form["phoneNumber"],
                    Remark = Request.Form["remark"],
                    CreatedAt = DateTime.Now,
                    SmsCode = Int32.Parse(Request.Form["SmsCode"]),
                    UserName = Request.Form["UserName"],
                    Password = Request.Form["Password"],
                    
                };

                var response = _subOrganizationService.UpdateSubsidiaryOrganization(subOrganizational);





                return Ok(new { response });

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
