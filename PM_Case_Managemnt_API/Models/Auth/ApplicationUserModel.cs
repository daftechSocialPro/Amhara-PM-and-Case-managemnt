using PM_Case_Managemnt_API.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PM_Case_Managemnt_API.Models.Auth
{
    public class ApplicationUserModel
    {
        public string UserName { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string[] Roles { get; set; } = null!;
        public Guid EmployeeId { get; set; }



    }
}
