using Azure;
using PM_Case_Managemnt_API.DTOS.CaseDto;
using PM_Case_Managemnt_API.DTOS.Common;

namespace PM_Case_Managemnt_API.Services.CaseService.CaseTypes
{
    public interface ICaseTypeService
    {
        public Task<ResponseMessage<int>> Add(CaseTypePostDto caseTypeDto);
        public Task<ResponseMessage<List<CaseTypeGetDto>>> GetAll(Guid subOrgId);
        public Task<ResponseMessage<List<SelectListDto>>> GetAllByCaseForm(string caseForm, Guid subOrgId);
        public Task<ResponseMessage<List<SelectListDto>>> GetAllSelectList(Guid subOrgId);

        public Task<ResponseMessage<List<SelectListDto>>> GetFileSettigs(Guid caseTypeId);
        public Task<ResponseMessage<int>> UpdateCaseType(CaseTypePostDto caseTypeDto);
        public Task<ResponseMessage<int>> DeleteCaseType(Guid caseTypeId);
        public Task<ResponseMessage<List<SelectListDto>>> GetChildCases(Guid caseTypeId);
        public ResponseMessage<int> GetChildOrder(Guid caseTypeId);

        public Task<ResponseMessage<List<CaseTypeGetDto>>> GetCaseTypeChildren(Guid caseTypeId);
    }
}
