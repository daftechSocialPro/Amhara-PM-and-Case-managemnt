using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Models.Common;
using PM_Case_Managemnt_API.Services.Common;

using System.Net.Http.Headers;

namespace PM_Case_Managemnt_API.Controllers.Common.Organization
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpPost, DisableRequestSizeLimit]

        public IActionResult Create()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Assets", "EmployeePhoto");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (!Directory.Exists(pathToSave))
                    Directory.CreateDirectory(pathToSave);
                

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    var employee = new EmployeeDto
                    {
                        Photo = dbPath,
                        Title = Request.Form["Title"],
                        FullName = Request.Form["FullName"],
                        Gender =   Request.Form["Gender"],
                        PhoneNumber = Request.Form["PhoneNumber"],
                        Remark = Request.Form["remark"],
                        Position = Request.Form["Position"],
                        StructureId = Request.Form["StructureId"],
                    };

                    var response = _employeeService.CreateEmployee(employee);

                    return Ok(new { response });

                }
                else
                {
                    return BadRequest();
                }
            }

            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<List<EmployeeDto>> getEmployess()
        {



            return await _employeeService.GetEmployees();
        }

        [HttpGet("selectlistNoUser")]

        public async Task<List<SelectListDto>> GetEmployeesNoUserSelectList()
        {

            return await _employeeService.GetEmployeesNoUserSelectList();
        }
        [HttpGet("selectlist")]

        public async Task<List<SelectListDto>> GetEmployeesSelectList()
        {

            return await _employeeService.GetEmployeesSelectList();
        }

    


        [HttpPut, DisableRequestSizeLimit]
        public IActionResult EmployeeUpdate()
        {
            try
            {
                string dbpath = "";
                if (Request.Form.Files.Any())
                {
                    var file = Request.Form.Files[0];
                    var folderName = Path.Combine("Assets", "EmployeePhoto");
                    var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);



                    if (file.Length > 0)
                    {
                        var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                        var fileNameSave = Request.Form["Id"] + fileName.Split('.')[0] + "." + fileName.Split('.')[1];
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
               
                var employee = new EmployeeDto
                {

                    Id = Guid.Parse(Request.Form["id"]),
                    Photo = dbpath != "" ? dbpath : Request.Form["Photo"],
                    Title = Request.Form["Title"],
                    FullName = Request.Form["FullName"],
                    Gender = Request.Form["Gender"],
                    PhoneNumber = Request.Form["PhoneNumber"],
                    Remark = Request.Form["remark"],
                   
                   


                };

                var response = _employeeService.UpdateEmployee(employee);





                return Ok(new { response });

            }

            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }

        [HttpGet("byStructureId")]
        public async Task<IActionResult> GetByStructureId( Guid StructureId )
        {
            try
            {
                return Ok(await _employeeService.GetEmployeeByStrucutreSelectList(StructureId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("GetEmployeesById")]

        public async Task<IActionResult> GetEmployeesById(Guid employeeId)
        {
            try
            {
                return Ok(await _employeeService.GetEmployeesById(employeeId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }

        }


    }



}
