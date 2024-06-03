using PM_Case_Managemnt_API.DTOS.Common.Archive;

namespace PM_Case_Managemnt_API.Services.Common.RowService
{
    public interface IRowService
    {
        public Task<ResponseMessage<int>> Add(RowPostDto rowPostDto);
        public Task<ResponseMessage<List<RowGetDto>>> GetAll(Guid shelfId);
    }
}
