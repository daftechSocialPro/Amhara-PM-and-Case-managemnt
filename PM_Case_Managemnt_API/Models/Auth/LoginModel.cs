using System.ComponentModel.DataAnnotations;

namespace PM_Case_Managemnt_API.Models.Auth
{
    public class LoginModel
    {
        public string UserName { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
    public class ChangePasswordModel
    {
        [Required]

        public string UserId { get; set; }

        public string? CurrentPassword { get; set; }

        [Required]
        public string NewPassword { get; set; }
    }
    public class UserRoleDto
    {
        public string UserId { get; set; } = null!;
        public string RoleName { get; set; } = null!;
    }

    public class EditUserDto
    {
        [Required]
        public string UserId { get; set; }
        public string UserName { get; set; } = null!;
        public string RowStatus { get; set; }
        public string? changePassword { get; set; }
    }
}
