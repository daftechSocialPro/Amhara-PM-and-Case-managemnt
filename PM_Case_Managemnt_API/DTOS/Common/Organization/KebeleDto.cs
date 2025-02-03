namespace PM_Case_Managemnt_API.DTOS.Common.Organization
{
    public class KebeleDto
    {
        public Guid? Id { get; set; }
        public Guid WoredaId { get; set; }
        public string WoredaName { get; set; }
        public string Name { get; set; } = null!;
        public string? Remark { get; set; }
        public int RowStatus { get; set; }
    }
    public class KebelePostDto
    {
        public Guid WoredaId { get; set; }
       
        public string Name { get; set; } = null!;
        public string? Remark { get; set; }
        public int RowStatus { get; set; }
    }
    public class KebelePutDto
    {
        public Guid? Id { get; set; }
        public Guid WoredaId { get; set; }
        public string Name { get; set; } = null!;
        public string? Remark { get; set; }
        public int RowStatus { get; set; }
    }
}
