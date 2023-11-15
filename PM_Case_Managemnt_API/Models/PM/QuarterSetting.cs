using PM_Case_Managemnt_API.Models.Common;

namespace PM_Case_Managemnt_API.Models.PM
{
    public class QuarterSetting : CommonModel
    {
        public string QuarterName { get; set; }
        public int QuarterOrder { get; set; }
        public int StartMonth { get; set; }
        public int EndMonth { get; set; }
    }
}
