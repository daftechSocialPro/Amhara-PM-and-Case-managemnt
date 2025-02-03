using PM_Case_Managemnt_API.Models.Common.Organization;
using PM_Case_Managemnt_API.DTOS.Common.Organization;
using PM_Case_Managemnt_API.Data;
using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Models.Common;
using PM_Case_Managemnt_API.DTOS.Common;
using Microsoft.EntityFrameworkCore.Query;

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
                CreatedAt = DateTime.UtcNow,
                RowStatus = woredaDto.RowStatus == 0 ? RowStatus.Active : RowStatus.InActive

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
            woreda.Remark = woredaDto.Remark;
            woreda.RowStatus = woredaDto.RowStatus == 0 ? RowStatus.Active : RowStatus.InActive;



            return await _context.SaveChangesAsync();
        }

        public async Task<int> DeleteWoreda(Guid woredaId)
        {
            var woreda = await _context.Woreda.FindAsync(woredaId);
            if (woreda == null) return 0;

            _context.Woreda.Remove(woreda);
            return await _context.SaveChangesAsync();
        }

        
        public async Task<List<WoredaDto>> GetWoredas(Guid? zoneId = null)
        {
            var query = _context.Woreda.AsQueryable(); // Join with Zone to get Zone Name

            if (zoneId.HasValue)
            {
                query = query.Where(k => k.ZoneId == zoneId.Value);
               
            }
            // Now include Woreda for the results
            query = query.Include(k => k.Zone);

            return await query.Select(k => new WoredaDto
            {
                Id = k.Id,
                Name = k.Name,
                ZoneId = k.ZoneId,
                ZoneName = k.Zone.Name,  // Add WoredaName
                Remark = k.Remark,
                RowStatus = k.RowStatus == RowStatus.Active ? 0 : 1       
            }).ToListAsync();
        }

        public async Task<WoredaDto> GetWoredaById(Guid woredaId)
        {
            var woreda = await _context.Woreda
                .Include(w => w.Zone)  // Join with Zone to get Zone Name
                .FirstOrDefaultAsync(w => w.Id == woredaId);

            if (woreda == null) return null;

            return new WoredaDto
            {
                Id = woreda.Id,
                Name = woreda.Name,
                ZoneId = woreda.ZoneId,
                ZoneName = woreda.Zone.Name,  // Add ZoneName
                Remark = woreda.Remark,
                RowStatus = woreda.RowStatus == RowStatus.Active ? 0 : 1
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
                CreatedAt = DateTime.UtcNow,
                RowStatus = kebeleDto.RowStatus == 0 ? RowStatus.Active : RowStatus.InActive
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
            kebele.Remark = kebeleDto.Remark;
            kebele.RowStatus = kebeleDto.RowStatus == 0 ? RowStatus.Active : RowStatus.InActive;


            return await _context.SaveChangesAsync();
        }

        public async Task<int> DeleteKebele(Guid kebeleId)
        {
            var kebele = await _context.Kebele.FindAsync(kebeleId);
            if (kebele == null) return 0;

            _context.Kebele.Remove(kebele);
            return await _context.SaveChangesAsync();
        }


        // Kebele Methods - GetKebeles with Woreda filtering
        public async Task<List<KebeleDto>> GetKebeles(Guid? woredaId = null)
        {
            // Start with the query including Woreda
            var query = _context.Kebele.AsQueryable();

            // Apply filter if woredaId is provided
            if (woredaId.HasValue)
            {
                query = query.Where(k => k.WoredaId == woredaId.Value);
            }

            // Now include Woreda for the results
            query = query.Include(k => k.Woreda);

            // Project the result into KebeleDto
            return await query.Select(k => new KebeleDto
            {
                Id = k.Id,
                Name = k.Name,
                WoredaId = k.WoredaId,
                WoredaName = k.Woreda.Name,  // Add WoredaName
                Remark = k.Remark,
                RowStatus = k.RowStatus == RowStatus.Active ? 0 : 1
            }).ToListAsync();
        }

        public async Task<KebeleDto> GetKebeleById(Guid kebeleId)
        {
            var kebele = await _context.Kebele
                .Include(k => k.Woreda)  // Join with Woreda to get Woreda Name
                .FirstOrDefaultAsync(k => k.Id == kebeleId);

            if (kebele == null) return null;

            return new KebeleDto
            {
                Id = kebele.Id,
                Name = kebele.Name,
                WoredaId = kebele.WoredaId,
                WoredaName = kebele.Woreda.Name,  // Add WoredaName
                Remark = kebele.Remark,
                RowStatus = kebele.RowStatus == RowStatus.Active ? 0 : 1
            };
        }
    }
}
