using PM_Case_Managemnt_API.Models.Common;

namespace PM_Case_Managemnt_API.Models.KPI
{
    public class KPIDetails : CommonModel
    {
        public Guid KPIId { get; set; }
        public KPIList KPI { get; set; }
        public string? Title { get; set; }
        public string MainGoal { get; set; }
        public float StartYearProgress { get; set; }
        public List<KPIData>? KPIDatas { get; set; }


    }
}
