using Microsoft.AspNetCore.Identity;
using PM_Case_Managemnt_API.Models.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace PM_Case_Managemnt_API.Models.Auth
{
    public class ApplicationUser : IdentityUser
    {
        [Column(TypeName = "nvarchar(150)")]
        public string FullName { get; set; }
        public Guid EmployeesId { get; set; }
        public Guid SubsidiaryOrganizationId { get; set; }
        public RowStatus RowStatus { get; set; }



    }


}
