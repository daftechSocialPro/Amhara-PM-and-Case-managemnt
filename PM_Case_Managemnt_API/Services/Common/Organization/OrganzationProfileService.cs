using Azure.Core;
using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.Models.Common;
using System.ComponentModel;

namespace PM_Case_Managemnt_API.Services.Common
{
    public class OrganzationProfileService : IOrganizationProfileService
    {

        private readonly DBContext _dBContext;
        public OrganzationProfileService(DBContext context)
        {
            _dBContext = context;
        }

        public async Task<int> CreateOrganizationalProfile(OrganizationProfile organizationProfile)
        {
            try
            {
                await _dBContext.AddAsync(organizationProfile);


                var orgBranch = new OrganizationBranch
                {
                    OrganizationProfileId = organizationProfile.Id,
                    Name = organizationProfile.OrganizationNameEnglish,
                    Address = organizationProfile.Address,
                    PhoneNumber = organizationProfile.PhoneNumber,
                    IsHeadOffice = true,
                    Remark= organizationProfile.Remark
                    
                };


                await _dBContext.AddAsync(orgBranch);


                await _dBContext.SaveChangesAsync();
                return 1;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return -1;
            }

        }
        public async Task<OrganizationProfile> GetOrganizationProfile()
        {
            return await _dBContext.OrganizationProfile.FirstOrDefaultAsync();
        }

        public async Task<int> UpdateOrganizationalProfile(OrganizationProfile organizationProfile)
        {


            //var orgBranch = _dBContext.OrganizationProfile.Where(x=>x.IsHeadOffice).FirstOrDefault();

            //orgBranch.OrganizationProfileId = organizationProfile.Id;
            //orgBranch.Name = organizationProfile.OrganizationNameEnglish;
            //orgBranch.Address = organizationProfile.Address;
            //orgBranch.PhoneNumber = organizationProfile.PhoneNumber;
            ////orgBranch.IsHeadOffice = true;
            //orgBranch.Remark = organizationProfile.Remark;



            //_dBContext.Entry(orgBranch).State = EntityState.Modified;
            //await _dBContext.SaveChangesAsync();

            _dBContext.Entry(organizationProfile).State = EntityState.Modified;
            await _dBContext.SaveChangesAsync();
            return 1;

        }


    }
}
