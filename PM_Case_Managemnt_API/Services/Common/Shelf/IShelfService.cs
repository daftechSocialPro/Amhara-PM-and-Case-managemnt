using PM_Case_Managemnt_API.DTOS.Common.Archive;

namespace PM_Case_Managemnt_API.Services.Common.ShelfService
{
    public interface IShelfService
    {
        public Task<ResponseMessage<int>> Add(ShelfPostDto shelfPostDto);
        public Task<ResponseMessage<List<ShelfGetDto>>> GetAll(Guid subOrgId);
    }
}
