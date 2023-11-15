using PM_Case_Managemnt_API.DTOS.CaseDto;

namespace PM_Case_Managemnt_API.Services.CaseService.FileSettings
{
    public interface IFileSettingsService
    {
        public Task Add(FileSettingPostDto fileSettingPost);
        public Task<List<FileSettingGetDto>> GetAll();
    }
}
