using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.DTOS.Common.Organization;
using PM_Case_Managemnt_API.Models.Auth;
using PM_Case_Managemnt_API.Models.Common;
using PM_Case_Managemnt_API.Models.Common.Organization;
using PM_Case_Managemnt_API.Services.Auth;
using PM_Case_Managemnt_API.Services.Common.SubsidiaryOrganization;


namespace PM_Case_Managemnt_API.Services.Common.SubOrganization
{
    public class SubsidiaryOrganizationService : ISubsidiaryOrganizationService
    {

        private readonly DBContext _dBContext;
        private readonly IAuthenticationService _authService;
        private AuthenticationContext _authenticationContext;
        private readonly IEmployeeService _empService;
        private readonly IOrgStructureService _orgStucService;
                

        public SubsidiaryOrganizationService(DBContext dbContext, IAuthenticationService authService, IEmployeeService empService, AuthenticationContext authenticationContext, IOrgStructureService orgStucService)
        {
            _dBContext = dbContext;
            _authService = authService;
            _empService = empService;
            _authenticationContext = authenticationContext;
            _orgStucService = orgStucService;
        }

        public async Task<int> CreateSubsidiaryOrganization(SubOrgDto subOrg)
        {
            try
            {
                var OrganizationProfileId = _dBContext.OrganizationProfile.FirstOrDefault();
                var subOrganization = new Models.Common.Organization.SubsidiaryOrganization
                {
                    Id = Guid.NewGuid(),
                    OrganizationNameEnglish = subOrg.OrganizationNameEnglish,
                    isRegulatoryBody = subOrg.isRegulatoryBody,
                    OrganizationNameInLocalLanguage = subOrg.OrganizationNameInLocalLanguage,
                    Address = subOrg.Address,
                    PhoneNumber = subOrg.PhoneNumber,
                    SmsCode = subOrg.SmsCode,
                    OrganizationProfileId = OrganizationProfileId.Id
                };
                


                string uniqueIdentifier = Guid.NewGuid().ToString("N").Substring(0, 4);

                string prefix = "superadmin";
                
                var empId = Guid.NewGuid();

                var superadmin = new ApplicationUserModel()
                {
                    SubsidiaryOrganizationId = subOrganization.Id,
                    UserName = $"{prefix}_{uniqueIdentifier}",
                    EmployeeId = empId,
                    Roles = new string[] {"SUPER ADMIN"},
                    FullName = $"SUPER ADMIN for {subOrganization.OrganizationNameEnglish}",
                    Password = "P@ssw0rd"
                };
                subOrganization.UserName = superadmin.UserName;
                subOrganization.Password = superadmin.Password;

                await _dBContext.AddAsync(subOrganization);
                await _dBContext.SaveChangesAsync();
                var orgStruc = new OrgStructureDto()
                {

                    SubsidiaryOrganizationId = subOrganization.Id,
                    StructureName = subOrganization.OrganizationNameEnglish,
                    Order = 1,
                    IsBranch = true,
                    OfficeNumber = subOrganization.Address,
                    Weight = 100,
                    Remark = "",
                    OrganizationBranchId = Guid.Empty,
                    RowStatus = 0,
                    Id = Guid.NewGuid(),
                };

                await _orgStucService.CreateOrganizationalStructure(orgStruc);

                var emp = new EmployeeDto()
                {
                    Id = empId,
                    FullName = $"SUPER-ADMIN for {subOrganization.OrganizationNameEnglish}",
                    Title = "MR.",
                    PhoneNumber = subOrganization.PhoneNumber,
                    Gender = "Male",
                    Remark = subOrganization.Remark,
                    StructureId = orgStruc.Id.ToString(),
                    Position = "Director",
                    Photo = OrganizationProfileId.Logo,
                };
                await _empService.CreateEmployee(emp);

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
            var EmployeeSelectList = await (from e in _dBContext.SubsidiaryOrganizations.Where( x => x.isMonitor == false)

                                            select new SelectListDto
                                            {
                                                Id = e.Id,
                                                Name = e.OrganizationNameEnglish

                                            }).ToListAsync();

            return EmployeeSelectList;



        }
        public async Task<Models.Common.Organization.SubsidiaryOrganization> GetSubsidiaryOrganizationById(Guid subOrgId)
        {

            return await _dBContext.SubsidiaryOrganizations.Where(x => x.Id == subOrgId).Include(u => u.OrganizationProfile).FirstOrDefaultAsync();
        }

    }
}
