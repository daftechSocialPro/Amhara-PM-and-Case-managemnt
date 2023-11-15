using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.Common;

using PM_Case_Managemnt_API.Models.Common;

namespace PM_Case_Managemnt_API.Services.Common
{
    public class BudgetYearService : IBudgetyearService
    {
        private readonly DBContext _dBContext;
        public BudgetYearService(DBContext context)
        {
            _dBContext = context;
        }

        public async Task<int> CreateProgramBudgetYear(ProgramBudgetYear programBudgetYear)
        {

            programBudgetYear.Id = Guid.NewGuid();


            await _dBContext.AddAsync(programBudgetYear);
            await _dBContext.SaveChangesAsync();

            return 1;

        }
        public async Task<List<ProgramBudgetYear>> GetProgramBudgetYears()
        {
            return await _dBContext.ProgramBudgetYears.Include(x => x.BudgetYears).ToListAsync();
        }

        public async Task<List<SelectListDto>> getProgramBudgetSelectList()
        {

            List<SelectListDto> list = await (from x in _dBContext.ProgramBudgetYears
                                              select new SelectListDto
                                              {
                                                  Id = x.Id,
                                                  Name = x.Name + " ( " + x.FromYear + " - " + x.ToYear + " )"

                                              }).ToListAsync();


            return list;
        }


        //budget year
        public async Task<int> CreateBudgetYear(BudgetYearDto BudgetYear)
        {


            BudgetYear budgetYear = new BudgetYear();

            budgetYear.Id = Guid.NewGuid();

            if (!string.IsNullOrEmpty(BudgetYear.FromDate))
            {
                string[] startDate = BudgetYear.FromDate.Split(new string[] { "/" }, StringSplitOptions.RemoveEmptyEntries);
                DateTime ShouldStartPeriod = Convert.ToDateTime(XAPI.EthiopicDateTime.GetGregorianDate(Int32.Parse(startDate[0]), Int32.Parse(startDate[1]), Int32.Parse(startDate[2])));
                budgetYear.FromDate = ShouldStartPeriod;
            }

            if (!string.IsNullOrEmpty(BudgetYear.ToDate))
            {

                string[] endDate = BudgetYear.ToDate.Split(new string[] { "/" }, StringSplitOptions.RemoveEmptyEntries);
                DateTime ShouldEnd = Convert.ToDateTime(XAPI.EthiopicDateTime.GetGregorianDate(Int32.Parse(endDate[0]), Int32.Parse(endDate[1]), Int32.Parse(endDate[2])));
                budgetYear.ToDate = ShouldEnd;
            }
            budgetYear.Remark = BudgetYear.Remark;
            budgetYear.Year = BudgetYear.Year;
            budgetYear.ProgramBudgetYearId = BudgetYear.ProgramBudgetYearId;
            budgetYear.CreatedBy = BudgetYear.CreatedBy;



            await _dBContext.AddAsync(budgetYear);
            await _dBContext.SaveChangesAsync();

            return 1;

        }



        public async Task<List<BudgetYearDto>> GetBudgetYears(Guid programBudgetYearId)
        {


            var budgetYears = await _dBContext.BudgetYears.Where(x => x.ProgramBudgetYearId == programBudgetYearId)
                                .Select(x => new BudgetYearDto
                                {
                                    Year = x.Year,
                                    FromDate = XAPI.EthiopicDateTime.GetEthiopicDate(x.FromDate.Day,x.FromDate.Month,x.FromDate.Year),
                                    ToDate = XAPI.EthiopicDateTime.GetEthiopicDate(x.ToDate.Day,x.ToDate.Month,x.ToDate.Year),
                                    ProgramBudgetYearId = x.ProgramBudgetYearId,
                                    Remark = x.Remark,
                                    CreatedBy = x.CreatedBy,

                                }).ToListAsync();



            return budgetYears;
        }

        public async Task<List<SelectListDto>> getBudgetSelectList()
        {

            List<SelectListDto> list = await (from x in _dBContext.BudgetYears
                                              select new SelectListDto
                                              {
                                                  Id = x.Id,
                                                  Name = x.Year.ToString() + " (" + " ) ( " + x.RowStatus + ")"

                                              }).ToListAsync();


            return list;
        }

        public async Task<List<SelectListDto>> GetBudgetYearsFromProgramId(Guid ProgramId)
        {


            var program = _dBContext.Programs.Find(ProgramId);

            return await (from x in _dBContext.BudgetYears.Where(x=>x.ProgramBudgetYearId==program.ProgramBudgetYearId)
                          select new SelectListDto
                          {
                              Id = x.Id,
                              Name = x.Year.ToString()

                          }).ToListAsync();


         }




            


    }
}
