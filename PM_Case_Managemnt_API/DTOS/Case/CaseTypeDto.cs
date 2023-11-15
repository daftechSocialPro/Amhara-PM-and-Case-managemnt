using Microsoft.Identity.Client;
using PM_Case_Managemnt_API.Models.CaseModel;
using PM_Case_Managemnt_API.Models.Common;

namespace PM_Case_Managemnt_API.DTOS.CaseDto
{
    public class CaseTypePostDto
    {
        public string CaseTypeTitle { get; set; } = null!;
        public string Code { get; set; } = null!;
        public float TotalPayment { get; set; }
        public float Counter { get; set; }
        public string MeasurementUnit { get; set; }
        public string ? CaseForm { get; set; }
        public string Remark { get; set; }
        public Guid CreatedBy { get; set; }
        public int? OrderNumber { get; set; }
        public Guid? ParentCaseTypeId { get; set; }

    }

    public class CaseTypeGetDto
    {
        public Guid Id { get; set; }

        public string CaseTypeTitle { get; set; }
        public string Remark { get; set; }
        public float TotalPayment { get; set; }
        public string RowStatus { get; set; }
        public string Code { get; set; }
        public string MeasurementUnit { get; set; }
        public Guid CreatedBy { get; set; }
        public string CreatedAt { get; set; }
        public float Counter { get; set; }
        public ICollection<CaseTypeGetDto>? Children {get;set;}
        //public Guid? ParentCaseTypeId { get; set; }
       // public virtual CaseType ParentCaseType { get; set; } = null!;
    }
}