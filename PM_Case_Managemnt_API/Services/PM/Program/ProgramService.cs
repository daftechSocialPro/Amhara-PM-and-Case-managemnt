using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.DTOS.PM;
using PM_Case_Managemnt_API.Models.Common;
using PM_Case_Managemnt_API.Models.PM;

namespace PM_Case_Managemnt_API.Services.PM.Program
{
    public class ProgramService:IProgramService
    {

        private readonly DBContext _dBContext;
        public ProgramService(DBContext context)
        {
            _dBContext = context;
        }

        public async Task<int> CreateProgram(Programs program)
        {

           program.Id = Guid.NewGuid();

           program.CreatedAt = DateTime.Now;
                   
           await _dBContext.AddAsync(program);
           await _dBContext.SaveChangesAsync();
               
             
            
            return 1;

        }

        public async Task<List<ProgramDto>> GetPrograms()
        {


            return await (from p in _dBContext.Programs.Include(x => x.ProgramBudgetYear)
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

        public async Task<List<SelectListDto>> GetProgramsSelectList()
        {


            return await (from p in _dBContext.Programs
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
                RemainingBudget = program.ProgramPlannedBudget - _dBContext.Plans.Sum(x => x.PlandBudget),
                RemainingWeight = 100 - _dBContext.Plans.Sum(x => x.PlanWeight),
                
                Remark = program.Remark
            };

            return programDto;   
            

        }

       


    }
}
