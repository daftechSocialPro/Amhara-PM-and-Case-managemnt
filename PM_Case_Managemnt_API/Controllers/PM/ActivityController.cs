using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.SqlServer.Server;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.DTOS.PM;
using PM_Case_Managemnt_API.Models.PM;
using PM_Case_Managemnt_API.Services.PM.Activity;

using System.Net.Http.Headers;

namespace PM_Case_Managemnt_API.Controllers.PM
{
    [Route("api/PM/[controller]")]
    [ApiController]
    public class ActivityController : ControllerBase
    {

        private readonly IActivityService _activityService;
        public ActivityController(IActivityService activityService)
        {
            _activityService = activityService;
        }


        [HttpPost]
        public IActionResult Create([FromBody] ActivityDetailDto addActivityDto)
        {
            try
            {
                var response = _activityService.AddActivityDetails(addActivityDto);
                return Ok(new { response });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }


        [HttpPost("AddSubActivity")]
        public IActionResult AddSubActivity([FromBody] SubActivityDetailDto subActivity)
        {
            try
            {
                var response = _activityService.AddSubActivity(subActivity);
                return Ok(new { response });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }


        [HttpPost("targetDivision")]
        public IActionResult AddTargetDivisionActivity(ActivityTargetDivisionDto activityTarget)
        {
            try
            {
                var response = _activityService.AddTargetActivities(activityTarget);
                return Ok(new { response });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }
        [HttpPost("addProgress")]

        public IActionResult AddActivityProgress()
        {

            try
            {
                var files = Request.Form.Files;



                List<string> DocumentPathlist = new List<string>();




                string FinancePath = "";
                if (files.Any())

                {
                    foreach (var file in files)
                    {

                        var folderName = Path.Combine("Assets", "ActivityDocuments");
                        
                        var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);


                        if (!Directory.Exists(pathToSave))
                        
                            Directory.CreateDirectory(pathToSave);
                        



                        if (file.Name == "Finance")
                        {
                            var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                            var fileNameSave = Guid.NewGuid() + "." + fileName.Split('.')[1];
                            var fullPath = Path.Combine(pathToSave, fileNameSave);
                            FinancePath = Path.Combine(folderName, fileNameSave);

                            if (System.IO.File.Exists(fullPath))
                            {
                                System.IO.File.Delete(fullPath);
                            }

                            using (var stream = new FileStream(fullPath, FileMode.Create))
                            {
                                file.CopyTo(stream);
                            }
                        }
                        if (file.Name == "files")
                        {
                            var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                            var fileNameSave = Guid.NewGuid() + "." + fileName.Split('.')[1];
                            var fullPath = Path.Combine(pathToSave, fileNameSave);
                            DocumentPathlist.Add(Path.Combine(folderName, fileNameSave));

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




                }
                var progress = new AddProgressActivityDto
                {

                    DcoumentPath = DocumentPathlist.ToArray(),
                    FinacncePath = FinancePath,
                    QuarterId = Guid.Parse(Request.Form["QuarterId"]),
                    ActualBudget = float.Parse(Request.Form["ActualBudget"]),
                    ActualWorked = float.Parse(Request.Form["ActualWorked"]),
                    Remark = Request.Form["Remark"],
                    ActivityId = Guid.Parse(Request.Form["ActivityId"]),
                    ProgressStatus = Request.Form["ProgressStatus"],
                    CreatedBy = Guid.Parse(Request.Form["CreatedBy"]),
                    EmployeeValueId = Guid.Parse(Request.Form["EmployeeValueId"]),
                    lat = Request.Form["lat"],
                    lng = Request.Form["lng"],

                };




                var response = _activityService.AddProgress(progress);
                return Ok(new { response });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }

        [HttpGet("viewProgress")]
        public async Task<List<ProgressViewDto>> ViewActivityProgress(Guid actId)
        {
            return await _activityService.ViewProgress(actId);
        }

        [HttpGet("getAssignedActivties")]
        public async Task<List<ActivityViewDto>> GetAssignedActivity (Guid employeeId)
        {
            return await _activityService.GetAssignedActivity(employeeId);
        }

        [HttpGet("forApproval")]
        public async Task<List<ActivityViewDto>> forApproval(Guid employeeId)
        {
            return await _activityService.GetActivtiesForApproval(employeeId);
        }

        [HttpPost("approve")]
       public IActionResult ApproveProgress(ApprovalProgressDto approvalProgressDto)
        {
            try
            {
                var response = _activityService.ApproveProgress(approvalProgressDto);
                return Ok(new { response });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }

        [HttpGet("getActivityAttachments")]
        public async Task<List<ActivityAttachmentDto>> GetActivityAtachments(Guid taskId)
        {
           
                return await _activityService.getAttachemnts(taskId);
             
          
        }

        [HttpGet("byActivityId")]
        public async Task<ActivityViewDto> getActivityById(Guid actId)
        {
            return await _activityService.getActivityById(actId);
        }

    }
}
