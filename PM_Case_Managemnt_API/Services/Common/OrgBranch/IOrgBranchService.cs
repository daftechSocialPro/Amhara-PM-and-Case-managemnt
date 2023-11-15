using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Models.Common;

namespace PM_Case_Managemnt_API.Services.Common
{
    public interface IOrgBranchService
    {

        public Task<int> CreateOrganizationalBranch(OrgBranchDto organizationBranch);

        public Task<int> UpdateOrganizationBranch(OrgBranchDto organizationBranch);
        public Task<List<OrgStructureDto>> GetOrganizationBranches();

        public Task<List<SelectListDto>> getBranchSelectList();
    }
}
