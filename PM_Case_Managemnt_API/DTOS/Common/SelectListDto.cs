using PM_Case_Managemnt_API.Models.PM;

namespace PM_Case_Managemnt_API.DTOS.Common
{
    public class SelectListDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string? Photo { get; set; }

        public string? EmployeeId { get; set; }

        public string ? CommiteeStatus { get; set; }
        public Guid? ZoneId { get; set; }  // Nullable
        public Guid? WoredaId { get; set; } // Nullable
        public Guid? KebeleId { get; set; } // Nullable
        public string? ZoneName { get; set; }  // Nullable
        public string? WoredaName { get; set; } // Nullable
        public string? KebeleName { get; set; } // Nullable
        public int? ZoneLevel { get; set; }
    }


    public class SelectRolesListDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }

    public class ZoneInfo {
        public Guid? ZoneId { get; set; }  // Nullable
        public string? Zone { get; set; }  // Nullable
        public Guid? WoredaId { get; set; } // Nullable
        public string? Woreda { get; set; }
        public Guid? KebeleId { get; set; } // Nullable
        public string? Kebele { get; set; }
    } 
        public class UserModel
    {

        public string EmployeeFullName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }

        public Guid EmployeeId { get; set; }

        public string[] Roles { get; set; }


    }

}
