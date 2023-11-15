using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.Common.Archive;
using PM_Case_Managemnt_API.Models.Common;

namespace PM_Case_Managemnt_API.Services.Common.ShelfService
{
    public class ShelfService: IShelfService
    {
        private readonly DBContext _dbContext;

        public ShelfService(DBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task Add(ShelfPostDto shelfPostDto)
        {
            try
            {
                Shelf newShelf = new()
                {
                    Id = Guid.NewGuid(),
                    CreatedAt = DateTime.Now,
                    CreatedBy = shelfPostDto.CreatedBy,
                    Remark = shelfPostDto.Remark,
                    RowStatus = RowStatus.Active,
                    ShelfNumber = shelfPostDto.ShelfNumber,
                };

                await _dbContext.Shelf.AddAsync(newShelf);
                await _dbContext.SaveChangesAsync();
            } catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }


        public async Task<List<ShelfGetDto>> GetAll()
        {
            try
            {
                return (await _dbContext.Shelf.Select(x => new ShelfGetDto()
                {
                    Id = x.Id, 
                    Remark = x.Remark, 
                    ShelfNumber = x.ShelfNumber
                }).ToListAsync());
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
