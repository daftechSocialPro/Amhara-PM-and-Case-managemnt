using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.DTOS.Common.Organization;
using PM_Case_Managemnt_API.Models.Auth;
using PM_Case_Managemnt_API.Models.Common;
using PM_Case_Managemnt_API.Models.Common.Organization;
using PM_Case_Managemnt_API.Services.Auth;
using PM_Case_Managemnt_API.Services.Common.SubsidiaryOrganization;
using PMCaseManagemntAPI.Migrations.Authentication;
using System.Net;

namespace PM_Case_Managemnt_API.Services.Common.SubOrganization
{
    public class SubsidiaryOrganizationService : ISubsidiaryOrganizationService
    {

        private readonly DBContext _dBContext;
        private readonly IAuthenticationService _authService;
        private AuthenticationContext _authenticationContext;
        private readonly IEmployeeService _empService;
                

        public SubsidiaryOrganizationService(DBContext dbContext, IAuthenticationService authService, IEmployeeService empService, AuthenticationContext authenticationContext)
        {
            _dBContext = dbContext;
            _authService = authService;
            _empService = empService;
            _authenticationContext = authenticationContext;
        }

        public async Task<int> CreateSubsidiaryOrganization(SubOrgDto subOrg)
        {
            try
            {
                var subOrganization = new Models.Common.Organization.SubsidiaryOrganization
                {
                    Id = Guid.NewGuid(),
                    OrganizationNameEnglish = subOrg.OrganizationNameEnglish,
                    isRegulatoryBody = subOrg.isRegulatoryBody,
                    OrganizationNameInLocalLanguage = subOrg.OrganizationNameInLocalLanguage,
                    Address = subOrg.Address,
                    PhoneNumber = subOrg.PhoneNumber,
                    SmsCode = subOrg.SmsCode,
                    OrganizationProfileId = subOrg.OrganizationProfileId
                };
                


                string uniqueIdentifier = Guid.NewGuid().ToString("N").Substring(0, 4);

                string prefix = "superadmin";


                var superadmin = new ApplicationUserModel()
                {
                    SubsidiaryOrganizationId = subOrganization.Id,
                    UserName = $"{prefix}_{uniqueIdentifier}",
                    EmployeeId = Guid.Parse("278b4187-413d-4f28-a63a-3d4f2b6c7f45"),
                    Roles = new string[] {"SUPER ADMIN"},
                    FullName = $"SUPER ADMIN for {subOrganization.OrganizationNameEnglish}",
                    Password = "P@ssw0rd"
                };
                subOrganization.UserName = superadmin.UserName;
                subOrganization.Password = superadmin.Password;

                await _dBContext.AddAsync(subOrganization);
                await _dBContext.SaveChangesAsync();

                await _authService.PostApplicationUser(superadmin);

                return 1;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return -1;
            }

        }
        public async Task<List<Models.Common.Organization.SubsidiaryOrganization>> GetSubsidiaryOrganization()
        {

            return await _dBContext.SubsidiaryOrganizations.Include(u => u.OrganizationProfile).ToListAsync();
        }

        public async Task<int> UpdateSubsidiaryOrganization(Models.Common.Organization.SubsidiaryOrganization subsidiaryOrganization)
        {



            _dBContext.Entry(subsidiaryOrganization).State = EntityState.Modified;
            await _dBContext.SaveChangesAsync();
            return 1;

        }

        public async Task<List<SelectListDto>> GetSubOrgSelectList()
        {
            var EmployeeSelectList = await (from e in _dBContext.SubsidiaryOrganizations

                                            select new SelectListDto
                                            {
                                                Id = e.Id,
                                                Name = e.OrganizationNameEnglish

                                            }).ToListAsync();

            return EmployeeSelectList;



        }

    }
}
