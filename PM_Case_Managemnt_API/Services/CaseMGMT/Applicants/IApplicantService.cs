using PM_Case_Managemnt_API.DTOS.CaseDto;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Models.CaseModel;

namespace PM_Case_Managemnt_API.Services.CaseMGMT.Applicants
{
    public interface IApplicantService
    {
        public Task<ResponseMessage<Guid>> Add(ApplicantPostDto applicant);
        public Task<ResponseMessage<List<ApplicantGetDto>>> GetAll(Guid subOrgId);

        public Task<ResponseMessage<List<SelectListDto>>> GetSelectList(Guid subOrgId);
        public Task<ResponseMessage<Guid>> Update(ApplicantPostDto applicantPost);

        public Task<ResponseMessage<Applicant>> GetApplicantById(Guid? applicantId);
    }
}
