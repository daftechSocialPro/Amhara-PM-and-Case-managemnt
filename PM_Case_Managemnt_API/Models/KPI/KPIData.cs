using PM_Case_Managemnt_API.Models.Common;

namespace PM_Case_Managemnt_API.Models.KPI
{
    public class KPIData : CommonModel
    {
        public Guid KPIDetailId { get; set; }
        public KPIDetails KPIDetail { get; set; }
        public int Year { get; set; }
        public string Data { get; set; }
    }
}
