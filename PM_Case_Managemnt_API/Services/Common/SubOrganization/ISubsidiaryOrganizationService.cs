using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.DTOS.Common.Organization;

namespace PM_Case_Managemnt_API.Services.Common.SubsidiaryOrganization
{
    public interface ISubsidiaryOrganizationService
    {

        Task<int> CreateSubsidiaryOrganization(SubOrgDto subOrg);
        Task<List<Models.Common.Organization.SubsidiaryOrganization>> GetSubsidiaryOrganization();
        Task<int> UpdateSubsidiaryOrganization(Models.Common.Organization.SubsidiaryOrganization subsidiaryOrganization);
        Task<List<SelectListDto>> GetSubOrgSelectList();
        Task<Models.Common.Organization.SubsidiaryOrganization> GetSubsidiaryOrganizationById(Guid subOrgId);

    }
}
