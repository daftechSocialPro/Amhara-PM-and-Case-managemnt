using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.CaseDto;
using PM_Case_Managemnt_API.Models.CaseModel;
using PM_Case_Managemnt_API.Services.CaseMGMT.FileInformationService;

namespace PM_Case_Managemnt_API.Services.CaseMGMT.FileInformationService
{
    public class FilesInformationService: IFilesInformationService
    {

        private readonly DBContext _dbContext;

        public FilesInformationService(DBContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task AddMany(List<FilesInformation> fileInformations)
        {
            try
            {
                await _dbContext.FilesInformations.AddRangeAsync(fileInformations);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        //public async Task<List<FilesInformation>> 
    }
}
