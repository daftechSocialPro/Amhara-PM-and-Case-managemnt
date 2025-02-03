namespace PM_Case_Managemnt_API.DTOS.Common.Organization
{
    public class WoredaDto
    {
        public Guid? Id { get; set; }
        public Guid ZoneId { get; set; }
        public string Name { get; set; } = null!;
        public string? Remark { get; set; }
        public int RowStatus { get; set; }

    }
    public class WoredaPostDto
    {
    
        public Guid ZoneId { get; set; }
        public string Name { get; set; } = null!;
        public string? Remark { get; set; }
        public int RowStatus { get; set; }

    }
    public class WoredaPutDto
    {
        public Guid? Id { get; set; }
        public Guid ZoneId { get; set; }
        public string Name { get; set; } = null!;
        public string? Remark { get; set; }
        public int RowStatus { get; set; }

    }
}
