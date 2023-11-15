
using PM_Case_Managemnt_API.Models.Common;

namespace PM_Case_Managemnt_API.Models.CaseModel
{
    public class CaseAttachment : CommonModel
    {

        public Guid CaseId { get; set; }
        public virtual Case Case { get; set; } = null!;
        public string FilePath { get; set; } = null!;
    }
}
