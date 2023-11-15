

using PM_Case_Managemnt_API.Models.Common;

namespace PM_Case_Managemnt_API.Models.PM
{
    public class ProgressAttachment : CommonModel
    {

        public Guid ActivityProgressId { get; set; }
        public virtual ActivityProgress ActivityProgress { get; set; } = null!;
        public string FilePath { get; set; } = null!;
    }
}
