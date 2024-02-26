using PM_Case_Managemnt_API.DTOS.CaseDto;
using PM_Case_Managemnt_API.DTOS.Common;

namespace PM_Case_Managemnt_API.Services.CaseService.CaseTypes
{
    public interface ICaseTypeService
    {
        public Task Add(CaseTypePostDto caseTypeDto);
        public Task<List<CaseTypeGetDto>> GetAll(Guid subOrgId);
        public Task<List<SelectListDto>> GetAllByCaseForm(string caseForm, Guid subOrgId);
        public Task<List<SelectListDto>> GetAllSelectList(Guid subOrgId);

        public Task<List<SelectListDto>> GetFileSettigs(Guid caseTypeId);
        public Task UpdateCaseType(CaseTypePostDto caseTypeDto);
        public Task DeleteCaseType(Guid caseTypeId);

        public int GetChildOrder(Guid caseTypeId);
    }
}
