using Azure.Core;
using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.Models.Common;
using System.ComponentModel;
using System.Net;

namespace PM_Case_Managemnt_API.Services.Common
{
    public class OrganzationProfileService : IOrganizationProfileService
    {

        private readonly DBContext _dBContext;
        public OrganzationProfileService(DBContext context)
        {
            _dBContext = context;
        }

        public async Task<ResponseMessage<int>> CreateOrganizationalProfile(OrganizationProfile organizationProfile)
        {
            var response = new ResponseMessage<int>();
            
            try
            {
                await _dBContext.AddAsync(organizationProfile);


                //var orgBranch = new OrganizationBranch
                //{
                //    OrganizationProfileId = organizationProfile.Id,
                //    Name = organizationProfile.OrganizationNameEnglish,
                //    Address = organizationProfile.Address,
                //    PhoneNumber = organizationProfile.PhoneNumber,
                //    IsHeadOffice = true,
                //    Remark= organizationProfile.Remark
                    
                //};


                //await _dBContext.AddAsync(orgBranch);


                await _dBContext.SaveChangesAsync();
                response.Message = "Operation Successful";
                response.Data = 1;
                response.Success = true;
                
                return response;
            }
            catch (Exception ex)
            {
                response.Message = $"{ex.Message}";
                response.Data = -1;
                response.Success = false;
                response.ErrorCode = HttpStatusCode.InternalServerError.ToString();

                return response;
            }

        }
        public async Task<ResponseMessage<OrganizationProfile>> GetOrganizationProfile(Guid orgProId)
        {
            var response = new ResponseMessage<OrganizationProfile>();
            
            var subOrg = await _dBContext.SubsidiaryOrganizations.Where(x => x.Id == orgProId).FirstOrDefaultAsync();
            OrganizationProfile result =  await _dBContext.OrganizationProfile.Where(x => x.Id == subOrg.OrganizationProfileId).FirstOrDefaultAsync();

            response.Message = "Operation Successful";
            response.Data = result;
            response.Success = true;

            return response;
        }

        public async Task<ResponseMessage<int>> UpdateOrganizationalProfile(OrganizationProfile organizationProfile)
        {

            var response = new ResponseMessage<int>();
            var orgBranch = _dBContext.OrganizationProfile.Where(x => x.Id == organizationProfile.Id).FirstOrDefault();

            if (orgBranch == null)
            {
                response.Message = "Branch not found";
                response.Data = -1;
                response.Success = false;
                response.ErrorCode = HttpStatusCode.NotFound.ToString();

                return response;
            }
            orgBranch.OrganizationNameEnglish = organizationProfile.OrganizationNameEnglish;
            orgBranch.OrganizationNameInLocalLanguage = organizationProfile.OrganizationNameInLocalLanguage;
            orgBranch.Address = organizationProfile.Address;
            orgBranch.PhoneNumber = organizationProfile.PhoneNumber;
            //orgBranch.IsHeadOffice = true;
            orgBranch.Remark = organizationProfile.Remark;



            _dBContext.Entry(orgBranch).State = EntityState.Modified;
            await _dBContext.SaveChangesAsync();

            //_dBContext.Entry(organizationProfile).State = EntityState.Modified;
            //await _dBContext.SaveChangesAsync();

            response.Message = "Operation Successful.";
            response.Data = 1;
            response.Success = true;
            
            return response;

        }


    }
}
