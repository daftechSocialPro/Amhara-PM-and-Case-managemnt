using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.DTOS.Common.Analytics;
using PM_Case_Managemnt_API.Models.CaseModel;
using PM_Case_Managemnt_API.Models.PM;

namespace PM_Case_Managemnt_API.Services.Common.Analytics
{
    public class AnalyticsService : IAnalyticsService
    {

        private readonly DBContext _dBContext;
        public AnalyticsService(DBContext context)
        {
            _dBContext = context;
        }

        public async Task<SubOrgsPlannedandusedBudgetDtos> GetOverallBudget()
        {
            List<OverallBudgetDto> overallPlannedBudgetDtos = new List<OverallBudgetDto>();

            List<OverallBudgetDto> overallUsedBudgetDtos = new List<OverallBudgetDto>();

            float taskUsedBudget = 0;
            float planUsedBudget = 0;
            float programUsedBudget = 0;
            var subOrgs = await _dBContext.SubsidiaryOrganizations.Select(e => new SelectListDto
                                                                                {
                                                                                    Id = e.Id,
                                                                                    Name = e.OrganizationNameEnglish

                                                                                }).ToListAsync();

            foreach(var sub in subOrgs)
            {
                var programs = await _dBContext.Programs.Where(x => x.SubsidiaryOrganizationId == sub.Id).ToListAsync();
                foreach(var program in programs)
                {
                    var plans = await _dBContext.Plans.Where(x => x.ProgramId== program.Id).ToListAsync();

                    foreach (var plan in plans)
                    {
                        var tasks = await _dBContext.Tasks.Where(x => x.PlanId== plan.Id).ToListAsync();
                        
                        foreach( var task in tasks)
                        {
                            var activities = await _dBContext.ActivityParents.Where(x => x.TaskId == task.Id)
                                                        .Join(_dBContext.Activities,
                                                              p => p.Id,
                                                              a => a.ActivityParentId,
                                                            (p, a) => a).ToListAsync();

                            var usedBudget = activities.Select(x => _dBContext.ActivityProgresses.Where(x => x.ActivityId == x.Id && x.IsApprovedByFinance == approvalStatus.approved).Sum(x => x.ActualBudget)).Sum();

                            taskUsedBudget += usedBudget;
                        }

                        planUsedBudget += taskUsedBudget;
                    }
                    programUsedBudget += planUsedBudget;
                }

                overallPlannedBudgetDtos.Add(new OverallBudgetDto
                {
                    SubOrganiztionName = sub.Name,
                    SubOrganizationBudget= programs.Select(x => x.ProgramPlannedBudget).Sum(),
                   
                });

                overallUsedBudgetDtos.Add(new OverallBudgetDto
                {
                    SubOrganiztionName = sub.Name,
                    SubOrganizationBudget = programUsedBudget,

                });
            }

            return new SubOrgsPlannedandusedBudgetDtos
            {
                PlannedBudget = overallPlannedBudgetDtos,
                Usedbudget = overallUsedBudgetDtos
            };

        }

        //public async Task<> GetOverallProgress()
        //{

        //}

    }
}
