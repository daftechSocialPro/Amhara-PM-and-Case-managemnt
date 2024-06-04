﻿using System.Net;
using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.DTOS.PM;
using PM_Case_Managemnt_API.Helpers;
using PM_Case_Managemnt_API.Models.Common;
using PM_Case_Managemnt_API.Models.PM;
using PM_Case_Managemnt_API.Services.PM.Plan;
using System.Numerics;

namespace PM_Case_Managemnt_API.Services.PM.Program
{
    public class ProgramService:IProgramService
    {

        private readonly DBContext _dBContext;
        private readonly IPlanService planService;

        public ProgramService(DBContext context, IPlanService planService)
        {
            _dBContext = context;
            this.planService = planService;
        }

        public async Task<ResponseMessage<int>> CreateProgram(Programs program)
        {

            var response = new ResponseMessage<int>();
            
           program.Id = Guid.NewGuid();

           program.CreatedAt = DateTime.Now;
                   
           await _dBContext.AddAsync(program);
           await _dBContext.SaveChangesAsync();
               
             
            
           response.Message = "Operation Successful.";
           response.Success = true;
           response.Data = 1;

           return response;

        }

        public async Task<ResponseMessage<List<ProgramDto>>> GetPrograms(Guid subOrgId)
        {

            var response = new ResponseMessage<List<ProgramDto>>();

            List<ProgramDto> result =  await (from p in _dBContext.Programs.Where(x => x.SubsidiaryOrganizationId == subOrgId).Include(x => x.ProgramBudgetYear)
                          select new ProgramDto
                          {
                              Id = p.Id,
                              ProgramName = p.ProgramName,
                              ProgramBudgetYear = p.ProgramBudgetYear.Name + " ( " + p.ProgramBudgetYear.FromYear + " - " + p.ProgramBudgetYear.ToYear + " )",
                              NumberOfProjects =  _dBContext.Plans.Where(x=>x.ProgramId == p.Id).Count() , //must be seen
                              ProgramStructure = _dBContext.Plans
                              .Include(x => x.Structure)
                              .Where(x => x.ProgramId == p.Id)
                              .Select(x => new ProgramStructureDto
                              {
                                  StructureName = x.Structure.StructureName + "( "+ _dBContext.Employees.Where(y => y.OrganizationalStructureId == x.StructureId && y.Position == Position.Director).FirstOrDefault().FullName +" )",
                                  //StructureHead = 
                              })
                                .GroupBy(x => x.StructureName)
                                .Select(g => new ProgramStructureDto
                                {
                                    StructureName = g.Key,
                                    StructureHead = g.Count().ToString() + " Projects"

                                })
                                .ToList(),
                                ProgramPlannedBudget = p.ProgramPlannedBudget,
                                Remark = p.Remark


                          }).ToListAsync();

            response.Message = "Operation Successful.";
            response.Success = true;
            response.Data = result;

            return response;
          
        }

        public async Task<ResponseMessage<List<SelectListDto>>> GetProgramsSelectList(Guid subOrgId)
        {

            var response = new ResponseMessage<List<SelectListDto>>();
            List<SelectListDto> result = await (from p in _dBContext.Programs.Where(n => n.SubsidiaryOrganizationId== subOrgId)
                          select new SelectListDto
                          {
                              Id= p.Id,
                              Name = p.ProgramName

                          }).ToListAsync();
            response.Message = "Operation Successful.";
            response.Success = true;
            response.Data = result;

            return response;
        }

        public async Task<ResponseMessage<ProgramDto>> GetProgramsById(Guid programId)
        {
            var response = new ResponseMessage<ProgramDto>();

            var program = _dBContext.Programs.Include(x => x.ProgramBudgetYear).Where(x=>x.Id == programId).FirstOrDefault();

            if (program == null)
            {
                response.Message = "Program not found.";
                response.Success = false;
                response.Data = null;
                response.ErrorCode = HttpStatusCode.NotFound.ToString();

                return response;
            }
            var programDto = new ProgramDto
            {
                ProgramName = program.ProgramName,
                ProgramBudgetYear = program.ProgramBudgetYear.Name + " ( " + program.ProgramBudgetYear.FromYear + " - " + program.ProgramBudgetYear.ToYear + " )",
                NumberOfProjects = 0,
                ProgramPlannedBudget = program.ProgramPlannedBudget,
                RemainingBudget = program.ProgramPlannedBudget - _dBContext.Plans.Where(x => x.ProgramId == program.Id).Sum(x => x.PlandBudget),
                RemainingWeight = 100 - _dBContext.Plans.Where(x => x.ProgramId == program.Id).Sum(x => x.PlanWeight),
                
                Remark = program.Remark
            };

            response.Message = "Operation Successful.";
            response.Success = true;
            response.Data = programDto;

            return response; 
            

        }

        public async Task<ResponseMessage> UpdateProgram(ProgramPostDto program)
        {
            var prog = await _dBContext.Programs.FindAsync(program.Id);
            if (prog != null) 
            {
                prog.ProgramName = program.ProgramName;
                prog.ProgramPlannedBudget = program.ProgramPlannedBudget;
                prog.ProgramBudgetYearId = program.ProgramBudgetYearId;
                prog.Remark = program.Remark;


                await _dBContext.SaveChangesAsync();

                return new ResponseMessage
                {
                    Success = true,
                    Message = "Program Updated Successfully"
                };

            }
            else
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = "Program Not Found"
                };

            }

        }

        public async Task<ResponseMessage> DeleteProgram(Guid programId)
        {
            var prog = await _dBContext.Programs.FindAsync(programId);
            if (prog == null)
            {
                return new ResponseMessage
                {

                    Message = "Program Not Found!!!",
                    Success = false
                };
            }

            try
            {

                var plans = await _dBContext.Plans.Where(x => x.ProgramId== programId).ToListAsync();

                foreach(var plan1 in plans)
                {
                    //planService.DeletePlan(plan);
                   

                    if (plan1 != null)
                    {
                        var tasks = await _dBContext.Tasks.Where(x => x.PlanId == plan1.Id).ToListAsync();

                        if (tasks.Any())
                        {
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

                                var activityParents = await _dBContext.ActivityParents.Where(x => x.TaskId == task.Id).ToListAsync();

                                if (activityParents.Any())
                                {
                                    foreach (var actP in activityParents)
                                    {
                                        var actvities = await _dBContext.Activities.Where(x => x.ActivityParentId == actP.Id).ToListAsync();

                                        foreach (var act in actvities)
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
                                    }

                                    _dBContext.ActivityParents.RemoveRange(activityParents);
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

                                        if (activityParents.Any())
                                        {
                                            _dBContext.ActivityParents.RemoveRange(activityParents);
                                            await _dBContext.SaveChangesAsync();
                                        }



                                    }

                                    _dBContext.Activities.RemoveRange(actvities2);
                                    await _dBContext.SaveChangesAsync();
                                }

                            }
                            _dBContext.Tasks.RemoveRange(tasks);
                            await _dBContext.SaveChangesAsync();


                            _dBContext.Plans.Remove(plan1);
                            await _dBContext.SaveChangesAsync();
                        }
                    }

           

                }

                _dBContext.Programs.Remove(prog);
                await _dBContext.SaveChangesAsync();

                return new ResponseMessage
                {
                    Success = true,
                    Message = "Program Deleted Successfully !!!"
                };
            }
            catch (Exception ex)
            {
                return new ResponseMessage
                {

                    Success = false,
                    Message = ex.Message

                };

            }

        }
       


    }
}
