using PM_Case_Managemnt_API.Models.Common;
using PM_Case_Managemnt_API.DTOS.Common;

namespace PM_Case_Managemnt_API.Services.Common
{
    public interface IUnitOfMeasurmentService
    {

        public Task<ResponseMessage<int>> CreateUnitOfMeasurment(UnitOfMeasurmentDto unitOfMeasurment);

        public Task<ResponseMessage<int>> UpdateUnitOfMeasurment(UnitOfMeasurmentDto unitOfMeasurment);

        //public Task<int> UpdateOrganizationalProfile(OrganizationProfile organizationProfile);
        public Task<ResponseMessage<List< PM_Case_Managemnt_API.Models.Common.UnitOfMeasurment >>> GetUnitOfMeasurment(Guid subOrgId);

        public Task<ResponseMessage<List<SelectListDto>>> getUnitOfMeasurmentSelectList(Guid subOrgId);



    }
}
