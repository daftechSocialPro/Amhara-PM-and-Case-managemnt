using PM_Case_Managemnt_API.DTOS.CaseDto;
using PM_Case_Managemnt_API.Models.CaseModel;

namespace PM_Case_Managemnt_API.Services.CaseMGMT.FileInformationService
{
    public interface IFilesInformationService
    {
        public Task AddMany(List<FilesInformation> fileInformations);
    }
}
