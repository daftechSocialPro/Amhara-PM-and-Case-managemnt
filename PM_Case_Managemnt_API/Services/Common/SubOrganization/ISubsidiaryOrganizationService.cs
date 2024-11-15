using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.DTOS.Common.Organization;
using PM_Case_Managemnt_API.Helpers;

namespace PM_Case_Managemnt_API.Services.Common.SubsidiaryOrganization
{
    public interface ISubsidiaryOrganizationService
    {

        Task<int> CreateSubsidiaryOrganization(SubOrgDto subOrg);
        Task<List<Models.Common.Organization.SubsidiaryOrganization>> GetSubsidiaryOrganization();
        Task<ResponseMessage> UpdateSubsidiaryOrganization(SubOrgDto subsidiaryOrganization);
        Task<ResponseMessage> DeleteSubsidiaryOrganization(Guid suOrgId);
        Task<List<SelectListDto>> GetSubOrgSelectList();
        Task<Models.Common.Organization.SubsidiaryOrganization> GetSubsidiaryOrganizationById(Guid subOrgId);

    }
}
