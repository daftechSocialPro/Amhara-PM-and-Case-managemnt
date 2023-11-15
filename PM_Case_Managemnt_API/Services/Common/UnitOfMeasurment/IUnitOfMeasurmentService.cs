using PM_Case_Managemnt_API.Models.Common;
using PM_Case_Managemnt_API.DTOS.Common;

namespace PM_Case_Managemnt_API.Services.Common
{
    public interface IUnitOfMeasurmentService
    {

        public Task<int> CreateUnitOfMeasurment(UnitOfMeasurmentDto unitOfMeasurment);

        public Task<int> UpdateUnitOfMeasurment(UnitOfMeasurmentDto unitOfMeasurment);

        //public Task<int> UpdateOrganizationalProfile(OrganizationProfile organizationProfile);
        public Task<List< PM_Case_Managemnt_API.Models.Common.UnitOfMeasurment >> GetUnitOfMeasurment();

        public Task<List<SelectListDto>> getUnitOfMeasurmentSelectList();



    }
}
