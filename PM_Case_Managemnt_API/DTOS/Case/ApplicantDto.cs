using PM_Case_Managemnt_API.Models.CaseModel;
using PM_Case_Managemnt_API.Models.Common;

namespace PM_Case_Managemnt_API.DTOS.CaseDto
{
    public class ApplicantPostDto
    {
        public string ApplicantName { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Email { get; set; }
        public string CustomerIdentityNumber { get; set; } = null!;
        public string ApplicantType { get; set; }
        public Guid CreatedBy { get; set; }

    }

    public class ApplicantGetDto: ApplicantPostDto
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; } 
        public RowStatus RowStatus { get; set; }

    }
}
