using PM_Case_Managemnt_API.DTOS.Common.Archive;

namespace PM_Case_Managemnt_API.Services.Common.ShelfService
{
    public interface IShelfService
    {
        public Task Add(ShelfPostDto shelfPostDto);
        public Task<List<ShelfGetDto>> GetAll();
    }
}
