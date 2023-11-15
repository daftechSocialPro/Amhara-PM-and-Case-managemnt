
using PM_Case_Managemnt_API.Models.PM;
using PM_Case_Managemnt_API.DTOS.PM;
using PM_Case_Managemnt_API.DTOS.Common;

namespace PM_Case_Managemnt_API.Services.PM
{
    public interface IProgramService
    {

        public Task<int> CreateProgram(Programs Programs);
        //public Task<int> UpdatePrograms(Programs Programs);
        public Task<List<ProgramDto>> GetPrograms();
        public Task<List<SelectListDto>> GetProgramsSelectList();

        public Task<ProgramDto> GetProgramsById(Guid programId);


    }
}
