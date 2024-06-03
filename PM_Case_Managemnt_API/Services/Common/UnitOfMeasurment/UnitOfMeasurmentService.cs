
using System.Net;
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

        public async Task<ResponseMessage<int>> CreateUnitOfMeasurment(UnitOfMeasurmentDto UnitOfMeasurment)
        {

            var response = new ResponseMessage<int>();
            var unitOfMeasurment = new UnitOfMeasurment
            {
                Id = Guid.NewGuid(),
                Name = UnitOfMeasurment.Name,
                LocalName = UnitOfMeasurment.LocalName,
                Type = UnitOfMeasurment.Type == 0 ? MeasurmentType.percent : MeasurmentType.number,
                CreatedAt = DateTime.Now,
                Remark= UnitOfMeasurment.Remark,
                SubsidiaryOrganizationId = UnitOfMeasurment.SubsidiaryOrganizationId
            };
            

            await _dBContext.AddAsync(unitOfMeasurment);
            await _dBContext.SaveChangesAsync();

            response.Message = "Operation Successful.";
            response.Data = 1;
            response.Success = true;
            
            return response;

        }
        public async Task<ResponseMessage<List<PM_Case_Managemnt_API.Models.Common.UnitOfMeasurment>>> GetUnitOfMeasurment(Guid subOrgId)
        {


            var response = new ResponseMessage<List < PM_Case_Managemnt_API.Models.Common.UnitOfMeasurment >> ();
            var result = await _dBContext.UnitOfMeasurment.Where(x => x.SubsidiaryOrganizationId == subOrgId).ToListAsync();
            //return k;
            response.Message = "Operation Successful.";
            response.Data = result;
            response.Success = true;
            
            return response;
        }

        public async Task<ResponseMessage<List<SelectListDto>>> getUnitOfMeasurmentSelectList(Guid subOrgId)
        {
            var response = new ResponseMessage<List<SelectListDto>>();
            
            List<SelectListDto> list = await (from x in _dBContext.UnitOfMeasurment.Where(x => x.SubsidiaryOrganizationId == subOrgId)
                                              select new SelectListDto
                                              {
                                                  Id = x.Id,
                                                  Name = x.Name + " ( "+x.LocalName+" ) "

                                              }).ToListAsync();


            response.Message = "Operation Successful.";
            response.Data = list;
            response.Success = true;
            
            return response;
        }

        public async Task<ResponseMessage<int>> UpdateUnitOfMeasurment(UnitOfMeasurmentDto unitOfMeasurmentDto)
        {
            var response = new ResponseMessage<int>();
            var unitMeasurment = _dBContext.UnitOfMeasurment.Find(unitOfMeasurmentDto.Id);
            if (unitMeasurment == null)
            {
                response.Message = "Unit of Measurment not Found.";
                response.Data = -1;
                response.Success = false;
                response.ErrorCode = HttpStatusCode.NotFound.ToString();
            
                return response;
            }
            unitMeasurment.Name = unitOfMeasurmentDto.Name;
            unitMeasurment.LocalName= unitOfMeasurmentDto.LocalName;
            unitMeasurment.Type = unitOfMeasurmentDto.Type == 0 ? MeasurmentType.percent : MeasurmentType.number;
            unitMeasurment.Remark = unitOfMeasurmentDto.Remark;
            unitMeasurment.RowStatus= unitOfMeasurmentDto.RowStatus== 0?RowStatus.Active:RowStatus.InActive;

            _dBContext.Entry(unitMeasurment).State = EntityState.Modified;
            await _dBContext.SaveChangesAsync();
            response.Message = "Operation Successful.";
            response.Data = -1;
            response.Success = true;
            
            return response;

        }
    }
}
