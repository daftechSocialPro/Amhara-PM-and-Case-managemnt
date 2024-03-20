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

        public async Task<int> CreateProgram(Programs program)
        {

           program.Id = Guid.NewGuid();

           program.CreatedAt = DateTime.Now;
                   
           await _dBContext.AddAsync(program);
           await _dBContext.SaveChangesAsync();
               
             
            
            return 1;

        }

        public async Task<List<ProgramDto>> GetPrograms(Guid subOrgId)
        {


            return await (from p in _dBContext.Programs.Where(x => x.SubsidiaryOrganizationId == subOrgId).Include(x => x.ProgramBudgetYear)
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


          
        }

        public async Task<List<SelectListDto>> GetProgramsSelectList(Guid subOrgId)
        {


            return await (from p in _dBContext.Programs.Where(n => n.SubsidiaryOrganizationId== subOrgId)
                          select new SelectListDto
                          {
                              Id= p.Id,
                              Name = p.ProgramName

                          }).ToListAsync();

        }

        public async Task<ProgramDto> GetProgramsById(Guid programId)
        {

            var program = _dBContext.Programs.Include(x => x.ProgramBudgetYear).Where(x=>x.Id == programId).FirstOrDefault();
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

            return programDto;   
            

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

                var plans = await _dBContext.Plans.Where(x => x.ProgramId== programId).Select(x => x.Id).ToListAsync();

                foreach(var plan in plans)
                {
                    planService.DeleteProject(plan);

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
