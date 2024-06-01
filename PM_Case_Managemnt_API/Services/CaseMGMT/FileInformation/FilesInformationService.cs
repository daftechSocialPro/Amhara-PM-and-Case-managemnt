using System.Net;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.CaseDto;
using PM_Case_Managemnt_API.DTOS.PM;
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
        public async Task<ResponseMessage<int>> AddMany(List<FilesInformation> fileInformations)
        {

            var response = new ResponseMessage<int>();
            try
            {
                await _dbContext.FilesInformations.AddRangeAsync(fileInformations);
                await _dbContext.SaveChangesAsync();

                response.Message = "operation Successfull.";
                response.Success = true;
                response.Data = 1;

                return response;
            }
            catch (Exception ex)
            {
                response.Message = $"{ex.Message}";
                response.Success = false;
                response.Data = 0;
                response.ErrorCode = HttpStatusCode.InternalServerError.ToString();

                return response;
            }
        }
        //public async Task<List<FilesInformation>> 
    }
}
