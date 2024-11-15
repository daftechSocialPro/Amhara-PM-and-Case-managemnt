﻿using Microsoft.AspNetCore.Mvc;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Helpers;
using PM_Case_Managemnt_API.Models.Auth;

namespace PM_Case_Managemnt_API.Services.Auth
{
    public interface IAuthenticationService
    {
        Task<Object> PostApplicationUser(ApplicationUserModel model);
        Task<IActionResult> Login(LoginModel model);
        Task<List<SelectRolesListDto>> GetRolesForUser();
        Task<List<EmployeeDto>> getUsers(Guid subOrgId);
        Task<ResponseMessage> ChangePassword(ChangePasswordModel model);
        Task<List<SelectRolesListDto>> GetNotAssignedRole(string userId);
        Task<List<SelectRolesListDto>> GetAssignedRoles(string userId);
        Task<ResponseMessage> AssignRole(UserRoleDto userRole);
        Task<ResponseMessage> RevokeRole(UserRoleDto userRole);
        Task<ResponseMessage> ChangePasswordAdmin(ChangePasswordModel model);
        Task<ResponseMessage> DeleteUser(string userId);
        Task<ResponseMessage> EditUser(EditUserDto model);



    }
}
