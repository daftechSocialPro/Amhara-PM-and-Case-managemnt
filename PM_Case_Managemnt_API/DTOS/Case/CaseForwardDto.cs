using PM_Case_Managemnt_API.Models.CaseModel;
using PM_Case_Managemnt_API.Models.Common;

namespace PM_Case_Managemnt_API.DTOS.CaseDto
{
    public class CaseForwardPostDto
    {
        public Guid CaseId { get; set; }
        public Guid ForwardedByEmployeeId { get; set; }
        public Guid[] ForwardedToStructureId { get; set; }
        public Guid CreatedBy { get; set; }

    }



    public class ConfirmTranscationDto
    {
        public Guid EmployeeId { get; set; }

        public Guid CaseHistoryId { get; set; }
    }
}
