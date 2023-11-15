using PM_Case_Managemnt_API.DTOS.CaseDto;
using PM_Case_Managemnt_API.Models.CaseModel;

namespace PM_Case_Managemnt_API.Services.CaseMGMT.CaseForwardService
{
    public interface ICaseForwardService
    {
        public Task AddMany(CaseForwardPostDto caseForwardPostDto);
    }
}
