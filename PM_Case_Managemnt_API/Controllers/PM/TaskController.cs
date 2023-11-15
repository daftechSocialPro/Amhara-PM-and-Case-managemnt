using Microsoft.AspNetCore.Mvc;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.DTOS.PM;
using PM_Case_Managemnt_API.Services.PM;

namespace PM_Case_Managemnt_API.Controllers.PM
{
    [Route("api/PM/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {

        private readonly ITaskService _taskService;
        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpPost]

        public IActionResult Create([FromBody] TaskDto task)
        {
            try
            {
                var response = _taskService.CreateTask(task);
                return Ok(new { response });

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }
        [HttpGet("ById")]
        public async Task<TaskVIewDto> GetSingleTask(Guid taskId)
        {

            return await _taskService.GetSingleTask(taskId);


        }
        [HttpPost("TaskMembers")]

        public IActionResult AddTaskMembers(TaskMembersDto taskMembers)
        {
            try
            {

                var response = _taskService.AddTaskMemebers(taskMembers);
                return Ok(new { response });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }
        [HttpPost("TaskMemo")]
        public IActionResult AddTaskMemo(TaskMemoRequestDto taskMemo)
        {

            try
            {
                var response = _taskService.AddTaskMemo(taskMemo);
                return Ok(new { response });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }


        }
        [HttpGet("selectlsitNoTask")]

        public async Task<List<SelectListDto>> GetEmployeesNoTaskMembers(Guid taskId)
        {

            return await _taskService.GetEmployeesNoTaskMembersSelectList(taskId);
        }


        [HttpGet("getByPlanIdIdSelectList")]

        public async Task<IActionResult> GetBYPlanIdSelectList(Guid taskId)
        {
            try
            {
                return Ok(await _taskService.GetTasksSelectList(taskId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }




        [HttpGet("getByTaskIdSelectList")]

        public async Task<IActionResult> GetBYTaskIdSelectList(Guid planId)
        {
            try
            {
                return Ok(await _taskService.GetTasksSelectList(planId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("GetActivitieParentsSelectList")]
        public async Task<IActionResult> GetActivitieParentsSelectList(Guid taskId)
        {
            try
            {
                return Ok(await _taskService.GetActivitieParentsSelectList(taskId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("GetActivitiesSelectList")]

        public async Task<IActionResult> GetActivitiesSelectList(Guid? planId, Guid? taskId, Guid? actParentId)
        {
            try
            {
                return Ok(await _taskService.GetActivitiesSelectList(planId, taskId, actParentId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

    }
}
