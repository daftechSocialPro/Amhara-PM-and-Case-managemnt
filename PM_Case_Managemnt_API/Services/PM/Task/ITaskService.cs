using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.DTOS.PM;
using PM_Case_Managemnt_API.Models.PM;
namespace PM_Case_Managemnt_API.Services.PM
{
    public interface ITaskService
    {

        public Task<int> CreateTask(TaskDto task);

        public Task<TaskVIewDto> GetSingleTask(Guid taskId);


        public Task<int> AddTaskMemebers(TaskMembersDto taskMembers);

        public Task<int> AddTaskMemo(TaskMemoRequestDto taskMemo);


        public Task<List<SelectListDto>> GetEmployeesNoTaskMembersSelectList(Guid taskId);


        public Task<List<SelectListDto>> GetTasksSelectList(Guid PlanId);

        public Task<List<SelectListDto>> GetActivitieParentsSelectList(Guid TaskId);
        public Task<List<SelectListDto>> GetActivitiesSelectList(Guid? planId, Guid? taskId, Guid? actParentId);




    }
}
