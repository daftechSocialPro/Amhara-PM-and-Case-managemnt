﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.DTOS.Common.Organization;
using PM_Case_Managemnt_API.Helpers;
using PM_Case_Managemnt_API.Models.Auth;
using PM_Case_Managemnt_API.Models.CaseModel;
using PM_Case_Managemnt_API.Models.Common;
using PM_Case_Managemnt_API.Models.Common.Organization;
using PM_Case_Managemnt_API.Models.PM;
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
        private UserManager<ApplicationUser> _userManager;

        public SubsidiaryOrganizationService(DBContext dbContext, 
            IAuthenticationService authService, 
            IEmployeeService empService, 
            AuthenticationContext authenticationContext, 
            IOrgStructureService orgStucService, 
            UserManager<ApplicationUser> userManager)
        {
            _dBContext = dbContext;
            _authService = authService;
            _empService = empService;
            _authenticationContext = authenticationContext;
            _orgStucService = orgStucService;
            _userManager = userManager;
        }

        public async Task<int> CreateSubsidiaryOrganization(SubOrgDto subOrg)
        {
            try
            {
                var OrganizationProfileId = _dBContext.OrganizationProfile.FirstOrDefault();
                var OrganizationProfile = new OrganizationProfile
                {
                    Id = Guid.NewGuid(),
                    OrganizationNameEnglish = subOrg.OrganizationNameEnglish,
                    OrganizationNameInLocalLanguage = subOrg.OrganizationNameInLocalLanguage,
                    Address = subOrg.Address,
                    PhoneNumber = subOrg.PhoneNumber,
                    Logo = " "
                };


                var subOrganization = new Models.Common.Organization.SubsidiaryOrganization
                {
                    Id = Guid.NewGuid(),
                    OrganizationNameEnglish = subOrg.OrganizationNameEnglish,
                    isRegulatoryBody = subOrg.isRegulatoryBody,
                    OrganizationNameInLocalLanguage = subOrg.OrganizationNameInLocalLanguage,
                    Address = subOrg.Address,
                    PhoneNumber = subOrg.PhoneNumber,
                    SmsCode = subOrg.SmsCode,
                    OrganizationProfileId = OrganizationProfileId.Id,
                    Remark =subOrg.Remark
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

            return await _dBContext.SubsidiaryOrganizations.Include(u => u.OrganizationProfile).Where(x => x.isMonitor == false).ToListAsync();
        }


        
        public async Task<ResponseMessage> UpdateSubsidiaryOrganization(SubOrgDto subOrg)
        {
            var subsidiaryOrganization = await _dBContext.SubsidiaryOrganizations.FindAsync(subOrg.Id);
            subsidiaryOrganization.OrganizationNameEnglish = subOrg.OrganizationNameEnglish;
            subsidiaryOrganization.OrganizationNameInLocalLanguage = subOrg.OrganizationNameInLocalLanguage;
            subsidiaryOrganization.Address = subOrg.Address;
            subsidiaryOrganization.PhoneNumber = subOrg.PhoneNumber;
            subsidiaryOrganization.Remark = subOrg.Remark;
            subsidiaryOrganization.SmsCode = subOrg.SmsCode;
            subsidiaryOrganization.isRegulatoryBody = subOrg.isRegulatoryBody;



            _dBContext.Entry(subsidiaryOrganization).State = EntityState.Modified;
            await _dBContext.SaveChangesAsync();
            return new ResponseMessage
            {
                Success = true,
                Message = "Subsidiary Organization Updated Successfully"
            };

        }

        public async Task<ResponseMessage> DeleteSubsidiaryOrganization(Guid suOrgId)
        {
            var subOrg = await _dBContext.SubsidiaryOrganizations.FindAsync(suOrgId);
            var programs = await _dBContext.Programs.Where(x => x.SubsidiaryOrganizationId == suOrgId).ToListAsync();
            foreach (var program in programs)
            {

                var plans = await _dBContext.Plans.Where(x => x.ProgramId == program.Id).ToListAsync();
                foreach (var plan in plans)
                {
                    var tasks = await _dBContext.Tasks.Where(x => x.PlanId == plan.Id).ToListAsync();
                    foreach (var task in tasks)
                    {
                        var taskMemos = await _dBContext.TaskMemos.Where(x => x.TaskId == task.Id).ToListAsync();
                        var taskMembers = await _dBContext.TaskMembers.Where(x => x.TaskId == task.Id).ToListAsync();

                        if (taskMemos.Any())
                        {
                            _dBContext.TaskMemos.RemoveRange(taskMemos);
                            await _dBContext.SaveChangesAsync();
                        }
                        if (taskMembers.Any())
                        {
                            _dBContext.TaskMembers.RemoveRange(taskMembers);
                            await _dBContext.SaveChangesAsync();
                        }
                        var actParent = await _dBContext.ActivityParents.Where(x => x.TaskId == task.Id).ToListAsync();
                        foreach (var actP in actParent)
                        {

                            var activities = await _dBContext.Activities.Where(x => x.ActivityParentId == actP.Id).ToListAsync();

                            foreach(var act in activities)
                            {
                                var actProgress = await _dBContext.ActivityProgresses.Where(x => x.ActivityId == act.Id).ToListAsync();

                                foreach (var actpro in actProgress)
                                {
                                    var progAttachments = await _dBContext.ProgressAttachments.Where(x => x.ActivityProgressId == actpro.Id).ToListAsync();
                                    if (progAttachments.Any())
                                    {
                                        _dBContext.ProgressAttachments.RemoveRange(progAttachments);
                                        await _dBContext.SaveChangesAsync();
                                    }

                                }

                                if (actProgress.Any())
                                {
                                    _dBContext.ActivityProgresses.RemoveRange(actProgress);
                                    await _dBContext.SaveChangesAsync();
                                }

                                var activityTargets = await _dBContext.ActivityTargetDivisions.Where(x => x.ActivityId == act.Id).ToListAsync();


                                if (activityTargets.Any())
                                {
                                    _dBContext.ActivityTargetDivisions.RemoveRange(activityTargets);
                                    await _dBContext.SaveChangesAsync();
                                }


                                var employees = await _dBContext.EmployeesAssignedForActivities.Where(x => x.ActivityId == act.Id).ToListAsync();


                                if (activityTargets.Any())
                                {
                                    _dBContext.EmployeesAssignedForActivities.RemoveRange(employees);
                                    await _dBContext.SaveChangesAsync();
                                }
                            }

                            if (activities.Any())
                            {
                                _dBContext.Activities.RemoveRange(activities);
                                await _dBContext.SaveChangesAsync();
                            }


                        }
                        if (actParent.Any())
                        {
                            _dBContext.ActivityParents.RemoveRange(actParent);
                            await _dBContext.SaveChangesAsync();

                        }
                        var actvities2 = await _dBContext.Activities.Where(x => x.TaskId == task.Id).ToListAsync();

                        if (actvities2.Any())
                        {
                            foreach (var act in actvities2)
                            {
                                var actProgress = await _dBContext.ActivityProgresses.Where(x => x.ActivityId == act.Id).ToListAsync();

                                foreach (var actpro in actProgress)
                                {
                                    var progAttachments = await _dBContext.ProgressAttachments.Where(x => x.ActivityProgressId == actpro.Id).ToListAsync();
                                    if (progAttachments.Any())
                                    {
                                        _dBContext.ProgressAttachments.RemoveRange(progAttachments);
                                        await _dBContext.SaveChangesAsync();
                                    }

                                }

                                if (actProgress.Any())
                                {
                                    _dBContext.ActivityProgresses.RemoveRange(actProgress);
                                    await _dBContext.SaveChangesAsync();
                                }

                                var activityTargets = await _dBContext.ActivityTargetDivisions.Where(x => x.ActivityId == act.Id).ToListAsync();


                                if (activityTargets.Any())
                                {
                                    _dBContext.ActivityTargetDivisions.RemoveRange(activityTargets);
                                    await _dBContext.SaveChangesAsync();
                                }


                                var employees = await _dBContext.EmployeesAssignedForActivities.Where(x => x.ActivityId == act.Id).ToListAsync();


                                if (employees.Any())
                                {
                                    _dBContext.EmployeesAssignedForActivities.RemoveRange(employees);
                                    await _dBContext.SaveChangesAsync();
                                }

                    

                            }

                            _dBContext.Activities.RemoveRange(actvities2);
                            await _dBContext.SaveChangesAsync();
                        }




                    }
                    if (tasks.Any())
                    {
                        _dBContext.Tasks.RemoveRange(tasks);
                        await _dBContext.SaveChangesAsync();
                    }


                }
                if (plans.Any())
                {
                    _dBContext.Plans.RemoveRange(plans);
                    await _dBContext.SaveChangesAsync();

                }
            }
            if(programs.Any())
            {
                _dBContext.Programs.RemoveRange(programs);
                await _dBContext.SaveChangesAsync();
            }

            var users = await _userManager.Users.Where(x => x.SubsidiaryOrganizationId == suOrgId).ToListAsync();
            if (users.Any())
            {
                foreach(var user in users)
                {
                    await _userManager.DeleteAsync(user);
                }
                
            }
            
            _dBContext.SubsidiaryOrganizations.Remove(subOrg);
            await _dBContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Success = true,
                Message = "Subsidiary Organization Deleted Successfully"
            };
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
