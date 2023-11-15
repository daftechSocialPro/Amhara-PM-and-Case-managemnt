

namespace PM_Case_Managemnt_API.Models.Common
{
    public class UnitOfMeasurment : CommonModel
    {
        public string Name { get; set; } = null!;

        public string LocalName { get; set; } = null!;
        public MeasurmentType Type { get; set; }

    }

    public enum MeasurmentType
    {
        percent,
        number
    }
}
