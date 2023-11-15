
using PM_Case_Managemnt_API.Models.Common;
namespace PM_Case_Managemnt_API.Services.Common
{
    public interface IOrganizationProfileService
    {
        public Task<int> CreateOrganizationalProfile(OrganizationProfile organizationProfile);
        public Task<int> UpdateOrganizationalProfile(OrganizationProfile organizationProfile);
        public Task<OrganizationProfile> GetOrganizationProfile();
    }
}
