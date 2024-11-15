﻿namespace PM_Case_Managemnt_API.DTOS.KPI
{
    public record KPIPostDto
    {
        public string Title { get; set; }
        public int StartYear { get; set; }
        public string ActiveYearsString { get; set; }
        public string? EncoderOrganizationName { get; set; }
        public string? EvaluatorOrganizationName { get; set; }
        public string? AccessCode { get; set; }
        public bool HasSubsidiaryOrganization { get; set; }
        public Guid? SubsidiaryOrganizationId { get; set; }
        public string? Url { get; set; }
        public Guid CreatedBy { get; set; }


    }

    public record KPIGetDto : KPIPostDto
    {
        public Guid Id { get; set; }
        public List<int>? ActiveYears { get; set; }
        public List<GroupedKPIDetailsGetDto>? KpiDetails { get; set; }
    }

    public record KPIGetSeventy
    {
        public Guid PlanId { get; set; }
        public string PlanTitle { get; set; }
        public float PlanWeight { get; set; }
        public float PlanResult { get; set; }
        public List<KPITask> KPITask { get; set; }
    }

    public record KPITask
    {
        public Guid TaskId { get; set; }
        public string TaskTitle { get; set; }
        public float TaskWeight { get; set; }
        public float TaskResult { get; set; }
        public List<KPIActivity> KPIActivity { get; set; }
    }
    public record KPIActivity
    {
        public Guid ActivityId { get; set; }
        public string ActivityTitle { get; set; }
        public float ActivityWeight { get; set; }
        public string Measurment { get; set; }
        public float Goal { get; set; }
        public float Actual { get; set; }
        public float Percentage { get; set; }
        public float ActivityResult { get; set; }
    }
}
