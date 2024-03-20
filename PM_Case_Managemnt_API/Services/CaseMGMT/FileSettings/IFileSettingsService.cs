using PM_Case_Managemnt_API.DTOS.CaseDto;
using PM_Case_Managemnt_API.Helpers;

namespace PM_Case_Managemnt_API.Services.CaseService.FileSettings
{
    public interface IFileSettingsService
    {
        public Task Add(FileSettingPostDto fileSettingPost);
        public Task<ResponseMessage> UpdateFilesetting(FileSettingPostDto fileSettingPost);
        public Task<ResponseMessage> DeleteFileSetting(Guid fileId);
        public Task<List<FileSettingGetDto>> GetAll(Guid subOrgId);
    }
}
