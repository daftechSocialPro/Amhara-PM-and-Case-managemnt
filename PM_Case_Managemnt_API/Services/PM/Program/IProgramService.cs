
using PM_Case_Managemnt_API.Models.PM;
using PM_Case_Managemnt_API.DTOS.PM;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Helpers;

namespace PM_Case_Managemnt_API.Services.PM
{
    public interface IProgramService
    {

        public Task<ResponseMessage<int>> CreateProgram(Programs Programs);
        //public Task<int> UpdatePrograms(Programs Programs);
        public Task<ResponseMessage<List<ProgramDto>>> GetPrograms(Guid subOrgId);
        public Task<ResponseMessage<List<SelectListDto>>> GetProgramsSelectList(Guid subOrgId);
        public Task<ResponseMessage<ProgramDto>> GetProgramsById(Guid programId);
        Task<ResponseMessage> UpdateProgram(ProgramPostDto program);
        Task<ResponseMessage> DeleteProgram(Guid programId);


    }
}
