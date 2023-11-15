using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.DTOS.PM;
using PM_Case_Managemnt_API.Models.PM;

namespace PM_Case_Managemnt_API.Services.PM.Plan
{
    public class PlanService : IPlanService
    {

        private readonly DBContext _dBContext;
        public PlanService(DBContext context)
        {
            _dBContext = context;
        }

        public async Task<int> CreatePlan(PlanDto plan)
        {

            var Plans = new PM_Case_Managemnt_API.Models.PM.Plan
            {
                Id = Guid.NewGuid(),
                BudgetYearId = plan.BudgetYearId,
                HasTask = plan.HasTask,
                PlanName = plan.PlanName,
                PlanWeight = plan.PlanWeight,
                PlandBudget = plan.PlandBudget,
                ProgramId = plan.ProgramId,
                ProjectType = plan.ProjectType == 0 ? ProjectType.Capital : ProjectType.Regular,
                Remark = plan.Remark,
                StructureId = plan.StructureId,
                ProjectManagerId = plan.ProjectManagerId,
                FinanceId = plan.FinanceId,
                CreatedAt = DateTime.Now,

            };
            await _dBContext.AddAsync(Plans);
            await _dBContext.SaveChangesAsync();
            return 1;

        }

        public async Task<List<PlanViewDto>> GetPlans( Guid ? programId)
        
        
        {

            var plans =programId!=null? _dBContext.Plans.Include(x => x.Structure).Include(x => x.ProjectManager).Include(x => x.Finance).Where(x => x.ProgramId == programId):
                _dBContext.Plans.Include(x => x.Structure).Include(x => x.ProjectManager).Include(x => x.Finance);


            return await (from p in plans             
                          
                          select new PlanViewDto
                          {

                              Id = p.Id,
                              PlanName = p.PlanName,
                              PlanWeight = p.PlanWeight,
                              PlandBudget = p.PlandBudget,
                              StructureName = p.Structure.StructureName,
                              RemainingBudget =p.PlandBudget- _dBContext.Tasks.Where(x=>x.PlanId ==p.Id).Sum(x=>x.PlanedBudget),
                              ProjectManager = p.ProjectManager.FullName,
                              FinanceManager = p.Finance.FullName,
                              Director = _dBContext.Employees.Where(x => x.Position == Models.Common.Position.Director&&x.OrganizationalStructureId== p.StructureId).FirstOrDefault().FullName,
                              ProjectType = p.ProjectType.ToString(),
                              NumberOfTask = _dBContext.Tasks.Count(x=>x.PlanId==p.Id),
                              NumberOfActivities = _dBContext.Activities.Include(x=>x.ActivityParent.Task.Plan).Where(x=>x.PlanId==p.Id||x.Task.PlanId==p.Id||x.ActivityParent.Task.PlanId==p.Id).Count(),
                              NumberOfTaskCompleted = _dBContext.Activities.Include(x => x.ActivityParent.Task.Plan).Where(x => x.Status ==Status.Finalized && (x.PlanId == p.Id || x.Task.PlanId == p.Id || x.ActivityParent.Task.PlanId == p.Id)).Count(),
                              HasTask = p.HasTask,


                          }).ToListAsync();




        }
        public async Task<PlanSingleViewDto> GetSinglePlan(Guid planId)
        {


            var tasks = (from t in _dBContext.Tasks.Where(x => x.PlanId == planId)
                        select new TaskVIewDto
                        {
                            Id= t.Id,
                            TaskName = t.TaskDescription,
                            TaskWeight = t.Weight,
                           
                            FinishedActivitiesNo= 0,
                            TerminatedActivitiesNo= 0,
                            StartDate= t.ShouldStartPeriod??DateTime.Now,
                            EndDate=t.ShouldEnd??DateTime.Now,
                           
                            HasActivity= t.HasActivityParent,
                            PlannedBudget  = t.PlanedBudget,
                            NumberOfMembers = _dBContext.TaskMembers.Count(x=>x.TaskId == t.Id),
                         
                            RemianingWeight = 100 - _dBContext.Activities.Sum(x => x.Weight),
                            NumberofActivities = _dBContext.Activities.Include(x => x.ActivityParent).Count(x => x.TaskId == t.Id || x.ActivityParent.TaskId == t.Id),
                            NumberOfFinalized = _dBContext.Activities.Include(x => x.ActivityParent).Count(x => x.Status == Status.Finalized && ( x.TaskId == t.Id || x.ActivityParent.TaskId == t.Id)),
                            NumberOfTerminated = _dBContext.Activities.Include(x => x.ActivityParent).Count(x => x.Status == Status.Terminated &&( x.TaskId == t.Id || x.ActivityParent.TaskId == t.Id))

                        }).ToList();

            float taskBudgetsum = tasks.Sum(x => x.PlannedBudget);
            float taskweightSum = tasks.Sum(x => x.TaskWeight ?? 0); 

     
                return await( from p in _dBContext.Plans.Where(x=>x.Id == planId)
                       select new PlanSingleViewDto
                       {
                           Id = p.Id,
                           PlanName = p.PlanName,
                           PlanWeight = p.PlanWeight,
                           PlannedBudget = p.PlandBudget,
                           RemainingBudget = p.PlandBudget - taskBudgetsum,
                           RemainingWeight = float.Parse( (100.0 - taskweightSum).ToString()),
                           EndDate = p.PeriodEndAt.ToString(),
                           StartDate = p.PeriodStartAt.ToString(),
                          

                           Tasks = tasks

                       }).FirstOrDefaultAsync();
            





        }

        public async Task<List<SelectListDto>> GetPlansSelectList(Guid ProgramId)
        {


            return await _dBContext.Plans.Where(x => x.ProgramId == ProgramId).Select(x => new SelectListDto
            {
                Name = x.PlanName,
                Id = x.Id
            }).ToListAsync();


        }



    }
}
