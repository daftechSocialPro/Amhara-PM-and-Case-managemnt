using PM_Case_Managemnt_API.DTOS.CaseDto;
using PM_Case_Managemnt_API.DTOS.Common;

namespace PM_Case_Managemnt_API.Services.CaseService.CaseTypes
{
    public interface ICaseTypeService
    {
        public Task Add(CaseTypePostDto caseTypeDto);
        public Task<List<CaseTypeGetDto>> GetAll();
        public Task<List<SelectListDto>> GetAllByCaseForm(string caseForm);
        public Task<List<SelectListDto>> GetAllSelectList();

        public Task<List<SelectListDto>> GetFileSettigs(Guid caseTypeId);

        public int GetChildOrder(Guid caseTypeId);
    }
}
