using PM_Case_Managemnt_API.DTOS.Common.Archive;

namespace PM_Case_Managemnt_API.Services.Common.RowService
{
    public interface IRowService
    {
        public Task Add(RowPostDto rowPostDto);
        public Task<List<RowGetDto>> GetAll(Guid shelfId);
    }
}
