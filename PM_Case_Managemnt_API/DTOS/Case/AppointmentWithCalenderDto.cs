using PM_Case_Managemnt_API.Models.CaseModel;
using PM_Case_Managemnt_API.Models.Common;

namespace PM_Case_Managemnt_API.DTOS.CaseDto
{
    public class AppointmentWithCalenderPostDto
    {
        public Guid EmployeeId { get; set; }
        public string AppointementDate { get; set; }
        public string Time { get; set; } = null!;
        public Guid CaseId { get; set; }
        public Guid CreatedBy { get; set; } 
        public string? Remark { get; set; }
    }
}
