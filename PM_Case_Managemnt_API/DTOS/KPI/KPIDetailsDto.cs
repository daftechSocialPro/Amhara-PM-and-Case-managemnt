using PM_Case_Managemnt_API.Models.KPI;

namespace PM_Case_Managemnt_API.DTOS.KPI
{
    public class KPIDetailsPostDto
    {
        public Guid KPIId { get; set; }
        public List<SimilarGoals> GoalGrouping { get; set; }
        public Guid CreatedBy { get; set; }
    }

    public class SimilarGoals
    {
        public string Goal { get; set; }
        public List<string> Titles { get; set; }
    }
    public class KPIDetailsGetDto 
    {
        public Guid Id { get; set; }
        public Guid? KPIId { get; set; }
        public string Title { get; set; }
        public string MainGoal { get; set; }
        public Guid? CreatedBy { get; set; }
        public List<KPIDataGetDto>? KPIDatas { get; set; }
    }
}
