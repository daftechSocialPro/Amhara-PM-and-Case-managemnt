using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.DTOS.Common.Organization;
using PM_Case_Managemnt_API.Helpers;

namespace PM_Case_Managemnt_API.Services.Common.SubsidiaryOrganization
{
    public interface ISubsidiaryOrganizationService
    {

        Task<ResponseMessage<int>> CreateSubsidiaryOrganization(SubOrgDto subOrg);
        Task<ResponseMessage<List<Models.Common.Organization.SubsidiaryOrganization>>> GetSubsidiaryOrganization();
        Task<ResponseMessage> UpdateSubsidiaryOrganization(SubOrgDto subsidiaryOrganization);
        Task<ResponseMessage> DeleteSubsidiaryOrganization(Guid suOrgId);
        Task<ResponseMessage<List<SelectListDto>>> GetSubOrgSelectList();
        Task<ResponseMessage<Models.Common.Organization.SubsidiaryOrganization>> GetSubsidiaryOrganizationById(Guid subOrgId);

    }
}
