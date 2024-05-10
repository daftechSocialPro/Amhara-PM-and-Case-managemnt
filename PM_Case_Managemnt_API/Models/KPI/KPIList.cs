using PM_Case_Managemnt_API.Models.Common;

namespace PM_Case_Managemnt_API.Models.KPI
{
    public class KPIList : CommonModel
    {
        public string Title { get; set; }
        public int StartYear { get; set; }
        public List<int> ActiveYears { get; set; }
        public string EncoderOrganizationName { get; set; }
        public string EvaluatorOrganizationName { get; set; }
        public string Url { get; set; }
        public List<KPIDetails> KPIDetails { get; set; } 

    }
}
