using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Helpers;

namespace PM_Case_Managemnt_API.Services.Common
{
    public interface IOrgStructureService
    {

        public Task<int> CreateOrganizationalStructure(OrgStructureDto orgStructure);

        public Task<int> UpdateOrganizationalStructure(OrgStructureDto organizationProfile);
        Task<ResponseMessage> DeleteOrganizationalStructure(Guid organizationStructurId);
        public Task<List<OrgStructureDto>> GetOrganizationStructures(Guid SubOrgId, Guid? BranchId);

        public Task<List<SelectListDto>> getParentStrucctureSelectList(Guid branchId);

        public Task<List<DiagramDto>> getDIagram(Guid? BranchId);


    }
}
