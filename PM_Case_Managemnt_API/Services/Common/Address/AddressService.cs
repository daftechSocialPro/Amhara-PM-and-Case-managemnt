using PM_Case_Managemnt_API.Models.Common.Organization;
using PM_Case_Managemnt_API.DTOS.Common.Organization;
using PM_Case_Managemnt_API.Data;
using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Models.Common;
using PM_Case_Managemnt_API.DTOS.Common;

namespace PM_Case_Managemnt_API.Services.Common.Address
{
    public class AddressService : IAddressService
    {
        private readonly DBContext _context;

        public AddressService(DBContext context)
        {
            _context = context;
        }

        // Zone Methods
        public async Task<int> CreateZone(ZonePostDto zoneDto)
        {
            var zone = new Zone
            {
                Id = Guid.NewGuid(),
                Name = zoneDto.Name,
                CreatedAt = DateTime.UtcNow,
                Remark = zoneDto.Remark,
                RowStatus = zoneDto.RowStatus == 0 ? RowStatus.Active : RowStatus.InActive
        };
            _context.Zone.Add(zone);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> UpdateZone(ZonePutDto zoneDto)
        {
            var zone = await _context.Zone.FindAsync(zoneDto.Id);
            if (zone == null) return 0;

            zone.Name = zoneDto.Name;
            zone.RowStatus = zoneDto.RowStatus == 0 ? RowStatus.Active : RowStatus.InActive;
            zone.Remark = zoneDto.Remark;
            return await _context.SaveChangesAsync();
        }

        public async Task<int> DeleteZone(Guid zoneId)
        {
            var zone = await _context.Zone.FindAsync(zoneId);
            if (zone == null) return 0;

            _context.Zone.Remove(zone);
            return await _context.SaveChangesAsync();
        }

        public async Task<List<ZoneDto>> GetZones()
        {
            return await _context.Zone.Select(z => new ZoneDto
            {
                Id = z.Id,
                Name = z.Name,
                Remark=z.Remark,
                RowStatus=z.RowStatus == RowStatus.Active ? 0 : 1
            }).ToListAsync();
        }

        public async Task<ZoneDto> GetZoneById(Guid zoneId)
        {
            var zone = await _context.Zone.FindAsync(zoneId);
            if (zone == null) return null;

            return new ZoneDto
            {
                Id = zone.Id,
                Name = zone.Name,
                Remark = zone.Remark,
                RowStatus = zone.RowStatus == RowStatus.Active ? 0 : 1
            };
        }

        // Woreda Methods
        public async Task<int> CreateWoreda(WoredaPostDto woredaDto)
        {
            var woreda = new Woreda
            {
                Id = Guid.NewGuid(),
                ZoneId = woredaDto.ZoneId,
                Name = woredaDto.Name,
                CreatedAt = DateTime.UtcNow
            };
            _context.Woreda.Add(woreda);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> UpdateWoreda(WoredaPutDto woredaDto)
        {
            var woreda = await _context.Woreda.FindAsync(woredaDto.Id);
            if (woreda == null) return 0;

            woreda.Name = woredaDto.Name;
            woreda.ZoneId = woredaDto.ZoneId;
          

            return await _context.SaveChangesAsync();
        }

        public async Task<int> DeleteWoreda(Guid woredaId)
        {
            var woreda = await _context.Woreda.FindAsync(woredaId);
            if (woreda == null) return 0;

            _context.Woreda.Remove(woreda);
            return await _context.SaveChangesAsync();
        }

        public async Task<List<WoredaDto>> GetWoredas()
        {
            return await _context.Woreda.Select(w => new WoredaDto
            {
                Id = w.Id,
                Name = w.Name,
                ZoneId = w.ZoneId
            }).ToListAsync();
        }

        public async Task<WoredaDto> GetWoredaById(Guid woredaId)
        {
            var woreda = await _context.Woreda.FindAsync(woredaId);
            if (woreda == null) return null;

            return new WoredaDto
            {
                Id = woreda.Id,
                Name = woreda.Name,
                ZoneId = woreda.ZoneId
            };
        }

        // Kebele Methods
        public async Task<int> CreateKebele(KebelePostDto kebeleDto)
        {
            var kebele = new Kebele
            {
                Id = Guid.NewGuid(),
                WoredaId = kebeleDto.WoredaId,
                Name = kebeleDto.Name,
                CreatedAt = DateTime.UtcNow
            };
            _context.Kebele.Add(kebele);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> UpdateKebele(KebelePutDto kebeleDto)
        {
            var kebele = await _context.Kebele.FindAsync(kebeleDto.Id);
            if (kebele == null) return 0;

            kebele.Name = kebeleDto.Name;
            kebele.WoredaId = kebeleDto.WoredaId;
            

            return await _context.SaveChangesAsync();
        }

        public async Task<int> DeleteKebele(Guid kebeleId)
        {
            var kebele = await _context.Kebele.FindAsync(kebeleId);
            if (kebele == null) return 0;

            _context.Kebele.Remove(kebele);
            return await _context.SaveChangesAsync();
        }

        public async Task<List<KebeleDto>> GetKebeles()
        {
            return await _context.Kebele.Select(k => new KebeleDto
            {
                Id = k.Id,
                Name = k.Name,
                WoredaId = k.WoredaId
            }).ToListAsync();
        }

        public async Task<KebeleDto> GetKebeleById(Guid kebeleId)
        {
            var kebele = await _context.Kebele.FindAsync(kebeleId);
            if (kebele == null) return null;

            return new KebeleDto
            {
                Id = kebele.Id,
                Name = kebele.Name,
                WoredaId = kebele.WoredaId
            };
        }
    }
}
