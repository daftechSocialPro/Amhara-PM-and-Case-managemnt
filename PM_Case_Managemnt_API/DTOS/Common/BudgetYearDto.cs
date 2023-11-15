namespace PM_Case_Managemnt_API.DTOS.Common
{
    public class BudgetYearDto
    {
        public int Year { get; set; }

        public string  FromDate { get; set; }

        public string ToDate { get; set; }

        public Guid ProgramBudgetYearId { get; set; }

        public string Remark { get; set; }

        public Guid CreatedBy { get; set; }
    }
}
