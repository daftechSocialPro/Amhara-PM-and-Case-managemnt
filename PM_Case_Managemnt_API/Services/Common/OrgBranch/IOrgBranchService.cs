using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Helpers;
using PM_Case_Managemnt_API.Models.Common;

namespace PM_Case_Managemnt_API.Services.Common
{
    public interface IOrgBranchService
    {

        public Task<ResponseMessage<int>> CreateOrganizationalBranch(OrgBranchDto organizationBranch);

        public Task<ResponseMessage<int>> UpdateOrganizationBranch(OrgBranchDto organizationBranch);
        public Task<ResponseMessage<List<OrgStructureDto>>> GetOrganizationBranches(Guid SubOrgId);

        public Task<ResponseMessage<List<SelectListDto>>> getBranchSelectList(Guid SubOrgId);
    }
}
