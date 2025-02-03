using PM_Case_Managemnt_API.Models.Common.Organization;
using PM_Case_Managemnt_API.Models.Common;
using PM_Case_Managemnt_API.DTOS.Common.Organization;
using PM_Case_Managemnt_API.DTOS.Common;

namespace PM_Case_Managemnt_API.Services.Common.Address
{
    public interface IAddressService
    {

        // Zone Methods
        Task<int> CreateZone(ZonePostDto zoneDto);
        Task<int> UpdateZone(ZonePutDto zoneDto);
        Task<int> DeleteZone(Guid zoneId);
        Task<List<ZoneDto>> GetZones();
        Task<ZoneDto> GetZoneById(Guid zoneId);

        // Woreda Methods
        Task<int> CreateWoreda(WoredaPostDto woredaDto);
        Task<int> UpdateWoreda(WoredaPutDto woredaDto);
        Task<int> DeleteWoreda(Guid woredaId);
        Task<List<WoredaDto>> GetWoredas(Guid? zoneId = null); // Filter by ZoneId (optional)
        Task<WoredaDto> GetWoredaById(Guid woredaId);

        // Kebele Methods
        Task<int> CreateKebele(KebelePostDto kebeleDto);
        Task<int> UpdateKebele(KebelePutDto kebeleDto);
        Task<int> DeleteKebele(Guid kebeleId);
        Task<List<KebeleDto>> GetKebeles(Guid? woredaId = null); // Filter by WoredaId (optional)
        Task<KebeleDto> GetKebeleById(Guid kebeleId);

    }
}
