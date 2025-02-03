namespace PM_Case_Managemnt_API.DTOS.Common.Organization
{
    public class ZoneDto
    {
        public Guid? Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Remark { get; set; }
        public int RowStatus { get; set; }
    }
    public class ZonePostDto
    {
        public string Name { get; set; } = null!;
        public string? Remark { get; set; }
        public int RowStatus { get; set; }
    }
    public class ZonePutDto
    {
        public Guid? Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Remark { get; set; }
        public int RowStatus { get; set; }
    }
}
