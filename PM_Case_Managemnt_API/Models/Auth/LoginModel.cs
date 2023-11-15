using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

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
        [Required]
        public string CurrentPassword { get; set; }

        [Required]
        public string NewPassword { get; set; }
    }
}
