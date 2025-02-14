using Microsoft.AspNetCore.Identity;
using PM_Case_Managemnt_API.Models.Common;
using PM_Case_Managemnt_API.Models.Common.Organization;
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
        public Guid? ZoneId { get; set; }  // Nullable
        public Guid? WoredaId { get; set; } // Nullable
        public Guid? KebeleId { get; set; } // Nullable

    }


}
