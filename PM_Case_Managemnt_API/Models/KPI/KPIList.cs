using PM_Case_Managemnt_API.Models.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace PM_Case_Managemnt_API.Models.KPI
{
    public class KPIList : CommonModel
    {
        public string Title { get; set; }
        public int StartYear { get; set; }
        private string _activeYearsString;

        public string ActiveYearsString
        {
            get { return _activeYearsString; }
            set
            {
                _activeYearsString = value;
                ActiveYears = _activeYearsString?.Split(',').Select(int.Parse).ToList() ?? new List<int>();
            }
        }

        [NotMapped]
        public List<int> ActiveYears { get; private set; }
        public string EncoderOrganizationName { get; set; }
        public string EvaluatorOrganizationName { get; set; }
        public string Url { get; set; }
        public List<KPIDetails>? KPIDetails { get; set; }

        public void SetActiveYearsFromList(List<int> years)
        {
            ActiveYearsString = string.Join(",", years);
        }
    }
}
