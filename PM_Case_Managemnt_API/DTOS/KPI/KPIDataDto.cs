namespace PM_Case_Managemnt_API.DTOS.KPI
{
    public class KPIDataPostDto
    {
        public Guid KPIDetailId { get; set; }
        public  List<Datas> Datas { get; set; }
        public Guid CreatedBy { get; set; }
    }

    public class Datas
    {
        public int Year { get; set; }
        public string Data { get; set; }
    }
    public class KPIDataGetDto : KPIDataPostDto
    {
        public Guid Id { get; set; }
        public Guid? KPIDetailId { get; set; }
        public int Year { get; set; }
        public string Data { get; set; }
    }
}
