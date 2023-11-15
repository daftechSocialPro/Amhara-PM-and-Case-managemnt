using PM_Case_Managemnt_API.Models.Common;

namespace PM_Case_Managemnt_API.Models.CaseModel
{
    public class Applicant : CommonModel
    {
  
        public string ApplicantName { get; set; } = null!;
   
        public string PhoneNumber { get; set; } = null!;

   
        public string Email { get; set; }

        public string CustomerIdentityNumber { get; set; } = null!;   
      

        public ApplicantType ApplicantType { get; set; }


    }

    public enum ApplicantType
    {
        Organization,
        Indivisual
    }
}
