namespace PM_Case_Managemnt_API.Models.Common.Organization
{
    public class Kebele : CommonModel
    {
        public Guid WoredaId { get; set; }
        public virtual Woreda Woreda { get; set; } = null!;
        public string Name { get; set; } = null!;
    }
}
