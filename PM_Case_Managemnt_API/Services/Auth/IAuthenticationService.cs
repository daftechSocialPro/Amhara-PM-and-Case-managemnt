using Microsoft.AspNetCore.Mvc;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Models.Auth;

namespace PM_Case_Managemnt_API.Services.Auth
{
    public interface IAuthenticationService
    {
        Task<Object> PostApplicationUser(ApplicationUserModel model);
        Task<IActionResult> Login(LoginModel model);
        Task<List<SelectRolesListDto>> GetRolesForUser();
        Task<List<EmployeeDto>> getUsers(Guid subOrgId);
        Task<IActionResult> ChangePassword(ChangePasswordModel model);


    }
}
