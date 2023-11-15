using Microsoft.AspNetCore.Identity;
using PM_Case_Managemnt_API.Models.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PM_Case_Managemnt_API.Models.Auth
{
    public class ApplicationUser : IdentityUser
    {
        [Column(TypeName ="nvarchar(150)")]
        public string FullName { get; set; }
        public Guid EmployeesId { get; set; }

        public virtual Employee Employees { get; set; }


    }

    
}
