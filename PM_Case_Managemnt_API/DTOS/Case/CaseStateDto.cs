using PM_Case_Managemnt_API.DTOS.Case;

namespace  PM_Case_Managemnt_API.DTOS.Case

{
    public class CaseState
        {  
            public string CurrentState { get; set; }
            public string NextState { get; set; }
            public List<string> NeededDocuments { get; set; }
        }
}