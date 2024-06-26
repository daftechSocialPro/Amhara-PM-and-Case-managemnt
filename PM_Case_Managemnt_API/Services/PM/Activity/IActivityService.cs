﻿using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.DTOS.PM;
using PM_Case_Managemnt_API.Helpers;
using PM_Case_Managemnt_API.Models.PM;


namespace PM_Case_Managemnt_API.Services.PM.Activity
{
    public interface IActivityService
    {
        public Task<int> AddActivityDetails(ActivityDetailDto activityDetail);
        public Task<int> AddSubActivity(SubActivityDetailDto subActivity);

        public Task<int> AddTargetActivities(ActivityTargetDivisionDto targetDivisions);

        public Task<int> AddProgress(AddProgressActivityDto activityProgress);

        public Task<List<ProgressViewDto>> ViewProgress(Guid actId);


        public Task<List<ActivityViewDto>> GetAssignedActivity(Guid employeeId);

        public Task<int> GetAssignedActivityNumber(Guid employeeId);


        public Task <List<ActivityViewDto>> GetActivtiesForApproval (Guid employeeId);


        public Task<int> ApproveProgress(ApprovalProgressDto approvalProgressDto);


        public Task<List<ActivityAttachmentDto>> getAttachemnts(Guid taskId);
        public Task<ActivityViewDto> getActivityById(Guid actId);


        public Task<List<SelectListDto>> GetEmployeesInBranch(Guid branchId);

        public Task<ReponseMessage> AssignEmployees(ActivityEmployees activityEmployee);

        public Task<ResponseMessage> UpdateActivityDetails(SubActivityDetailDto activityDetail);
        public Task<ResponseMessage> DeleteActivity(Guid activityId, Guid taskId);


    }
}
