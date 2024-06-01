using Azure;
using PM_Case_Managemnt_API.DTOS.CaseDto;
using PM_Case_Managemnt_API.Helpers;

namespace PM_Case_Managemnt_API.Services.CaseService.FileSettings
{
    public interface IFileSettingsService
    {
        public Task<ResponseMessage<int>> Add(FileSettingPostDto fileSettingPost);
        public Task<ResponseMessage> UpdateFilesetting(FileSettingPostDto fileSettingPost);
        public Task<ResponseMessage> DeleteFileSetting(Guid fileId);
        public Task<ResponseMessage<List<FileSettingGetDto>>> GetAll(Guid subOrgId);
    }
}
