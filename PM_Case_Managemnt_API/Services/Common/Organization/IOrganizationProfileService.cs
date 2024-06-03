﻿
using PM_Case_Managemnt_API.Models.Common;
namespace PM_Case_Managemnt_API.Services.Common
{
    public interface IOrganizationProfileService
    {
        public Task<ResponseMessage<int>> CreateOrganizationalProfile(OrganizationProfile organizationProfile);
        public Task<ResponseMessage<int>> UpdateOrganizationalProfile(OrganizationProfile organizationProfile);
        public Task<ResponseMessage<OrganizationProfile>> GetOrganizationProfile(Guid orgProId);
    }
}
