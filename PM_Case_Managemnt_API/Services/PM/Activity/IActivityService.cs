﻿using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.DTOS.PM;
using PM_Case_Managemnt_API.Helpers;
using PM_Case_Managemnt_API.Models.PM;


namespace PM_Case_Managemnt_API.Services.PM.Activity
{
    public interface IActivityService
    {
        public Task<ResponseMessage<int>> AddActivityDetails(ActivityDetailDto activityDetail);
        public Task<ResponseMessage<int>> AddSubActivity(SubActivityDetailDto subActivity);

        public Task<ResponseMessage<int>> AddTargetActivities(ActivityTargetDivisionDto targetDivisions);

        public Task<ResponseMessage<int>> AddProgress(AddProgressActivityDto activityProgress);

        public Task<ResponseMessage<List<ProgressViewDto>>> ViewProgress(Guid actId);


        public Task<ResponseMessage<List<ActivityViewDto>>> GetAssignedActivity(Guid employeeId);

        public Task<ResponseMessage<int>> GetAssignedActivityNumber(Guid employeeId);


        public Task <ResponseMessage<List<ActivityViewDto>>> GetActivtiesForApproval (Guid employeeId);


        public Task<ResponseMessage<int>> ApproveProgress(ApprovalProgressDto approvalProgressDto);


        public Task<ResponseMessage<List<ActivityAttachmentDto>>> getAttachemnts(Guid taskId);
        public Task<ResponseMessage<ActivityViewDto>> getActivityById(Guid actId);


        public Task<ResponseMessage<List<SelectListDto>>> GetEmployeesInBranch(Guid branchId);

        public Task<ReponseMessage> AssignEmployees(ActivityEmployees activityEmployee);

        public Task<ResponseMessage> UpdateActivityDetails(SubActivityDetailDto activityDetail);
        public Task<ResponseMessage> DeleteActivity(Guid activityId, Guid taskId);


    }
}
