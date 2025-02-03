namespace PM_Case_Managemnt_API.Models.Common.Organization
{
    public class Woreda:CommonModel
    {
        public Guid ZoneId { get; set; }
        public virtual Zone Zone { get; set; } = null!;
        public string Name { get; set; } = null!;
    }
}
