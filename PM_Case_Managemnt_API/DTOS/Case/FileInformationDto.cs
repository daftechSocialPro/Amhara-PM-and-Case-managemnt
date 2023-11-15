using PM_Case_Managemnt_API.Models.CaseModel;

namespace PM_Case_Managemnt_API.DTOS.CaseDto
{
    public class FilesInformationPostDto
    {
        public string? FilePath { get; set; } = null!;
        //public Filelookup FileLookup { get; set; }        
        //public Guid ParentId { get; set; }       
        public string? FileDescription { get; set; } = null!;
        public Guid FileSettingId { get; set; }
        public virtual FileSetting FileSetting { get; set; } = null!;
        public string filetype { get; set; }
        public Guid CaseId { get; set; }
        public Guid CreatedBy { get; set; }

    }
}
