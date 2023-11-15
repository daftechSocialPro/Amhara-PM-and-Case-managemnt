
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Models.Common;
using PM_Case_Managemnt_API.Data;
using Microsoft.EntityFrameworkCore;

namespace PM_Case_Managemnt_API.Services.Common
{
    public class UnitOfMeasurmentService : IUnitOfMeasurmentService
    {


        private readonly DBContext _dBContext;
        public UnitOfMeasurmentService(DBContext context)
        {
            _dBContext = context;
        }

        public async Task<int> CreateUnitOfMeasurment(UnitOfMeasurmentDto UnitOfMeasurment)
        {


            var unitOfMeasurment = new UnitOfMeasurment
            {
                Id = Guid.NewGuid(),
                Name = UnitOfMeasurment.Name,
                LocalName = UnitOfMeasurment.LocalName,
                Type = UnitOfMeasurment.Type == 0 ? MeasurmentType.percent : MeasurmentType.number,
                CreatedAt = DateTime.Now,
                Remark= UnitOfMeasurment.Remark,
            };
            

            await _dBContext.AddAsync(unitOfMeasurment);
            await _dBContext.SaveChangesAsync();

            return 1;

        }
        public async Task<List<PM_Case_Managemnt_API.Models.Common.UnitOfMeasurment>> GetUnitOfMeasurment()
        {



            var k = await _dBContext.UnitOfMeasurment.ToListAsync();
            return await _dBContext.UnitOfMeasurment.ToListAsync();
        }

        public async Task<List<SelectListDto>> getUnitOfMeasurmentSelectList()
        {

            List<SelectListDto> list = await (from x in _dBContext.UnitOfMeasurment
                                              select new SelectListDto
                                              {
                                                  Id = x.Id,
                                                  Name = x.Name + " ( "+x.LocalName+" ) "

                                              }).ToListAsync();


            return list;
        }

        public async Task<int> UpdateUnitOfMeasurment(UnitOfMeasurmentDto unitOfMeasurmentDto)
        {

            var unitMeasurment = _dBContext.UnitOfMeasurment.Find(unitOfMeasurmentDto.Id);

            unitMeasurment.Name = unitOfMeasurmentDto.Name;
            unitMeasurment.LocalName= unitOfMeasurmentDto.LocalName;
            unitMeasurment.Type = unitOfMeasurmentDto.Type == 0 ? MeasurmentType.percent : MeasurmentType.number;
            unitMeasurment.Remark = unitOfMeasurmentDto.Remark;
            unitMeasurment.RowStatus= unitOfMeasurmentDto.RowStatus== 0?RowStatus.Active:RowStatus.InActive;

            _dBContext.Entry(unitMeasurment).State = EntityState.Modified;
            await _dBContext.SaveChangesAsync();
            return 1;

        }
    }
}
