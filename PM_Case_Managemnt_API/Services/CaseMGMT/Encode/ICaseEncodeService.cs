﻿using PM_Case_Managemnt_API.DTOS.CaseDto;

namespace PM_Case_Managemnt_API.Services.CaseService.Encode
{
    public interface ICaseEncodeService
    {
        public Task<string> Add(CaseEncodePostDto caseEncodePostDto);
        public Task<string> Update(CaseEncodePostDto caseEncodePostDto);
        public Task<List<CaseEncodeGetDto>> GetAll(Guid userId);
        public Task<CaseEncodeGetDto> GetSingleCase(Guid caseId);
        public Task<string> GetCaseNumber(Guid subOrgId);
        public Task<List<CaseEncodeGetDto>> GetAllTransfred(Guid employeeId);
        public Task<List<CaseEncodeGetDto>> MyCaseList(Guid employeeId);

        public Task<List<CaseEncodeGetDto>> CompletedCases(Guid subOrgId, Guid orgStuctId);

        public Task<List<CaseEncodeGetDto>> GetArchivedCases(Guid subOrgId, Guid orgStuctId);




        public Task<List<CaseEncodeGetDto>> SearchCases(string filter, Guid subOrgId);


    }
}
