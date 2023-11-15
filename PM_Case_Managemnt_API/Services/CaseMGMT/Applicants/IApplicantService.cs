using PM_Case_Managemnt_API.DTOS.CaseDto;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Models.CaseModel;

namespace PM_Case_Managemnt_API.Services.CaseMGMT.Applicants
{
    public interface IApplicantService
    {
        public Task<Guid> Add(ApplicantPostDto applicant);
        public Task<List<ApplicantGetDto>> GetAll();

        public Task<List<SelectListDto>> GetSelectList();

        public Task<Applicant> GetApplicantById(Guid? applicantId);
    }
}
