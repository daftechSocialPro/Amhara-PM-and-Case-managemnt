using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.CaseDto;
using PM_Case_Managemnt_API.Models.CaseModel;

namespace PM_Case_Managemnt_API.Services.CaseService.FileSettings
{
    public class FileSettingService: IFileSettingsService
    {
        private readonly DBContext _dbContext;


        public FileSettingService(DBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task Add(FileSettingPostDto fileSettingPost)
        {
            try
            {
                FileSetting fileSetting = new()
                {
                    Id = Guid.NewGuid(),
                    CreatedAt = DateTime.Now,
                    CreatedBy = fileSettingPost.CreatedBy,
                    FileName = fileSettingPost.Name,
                    FileType = Enum.Parse<FileType>( fileSettingPost.FileType),
                    CaseTypeId = fileSettingPost.CaseTypeId,
                };

                await _dbContext.AddAsync(fileSetting);
                await _dbContext.SaveChangesAsync();
            } catch (Exception ex)
            {
                throw new Exception("Error creating file setting");
            }
        }

        public async Task<List<FileSettingGetDto>> GetAll()
        {
            try
            {
                List<FileSetting> fileSettings = await _dbContext.FileSettings.Include(x=>x.CaseType).ToListAsync();
                List<FileSettingGetDto> result = new();

                foreach (FileSetting fileSetting in fileSettings)
                {
                    result.Add(new FileSettingGetDto
                    {
                        Id= fileSetting.Id,
                        CaseTypeTitle = fileSetting.CaseType.CaseTypeTitle,
                        CreatedAt= fileSetting.CreatedAt,
                        CreatedBy = fileSetting.CreatedBy,
                        Name = fileSetting.FileName, 
                        FileType = fileSetting.FileType.ToString(),
                        RowStatus = fileSetting.RowStatus.ToString(),
                    });
                }

                return result;

            } catch (Exception ex)
            {
                throw new Exception("Error Retrieving File settings");
            }
        }
    }
}
