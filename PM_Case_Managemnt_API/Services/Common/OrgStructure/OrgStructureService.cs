using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Helpers;
using PM_Case_Managemnt_API.Models.Common;
using Type = PM_Case_Managemnt_API.Models.Common.Type;

namespace PM_Case_Managemnt_API.Services.Common
{
    public class OrgStructureService : IOrgStructureService
    {
        private readonly DBContext _dBContext;
        public OrgStructureService(DBContext context)
        {
            _dBContext = context;
        }

        public async Task<int> CreateOrganizationalStructure(OrgStructureDto orgStructure)
        {


            //var orgainzationProfile = _dBContext.OrganizationProfile.FirstOrDefault();
            //var id = Guid.NewGuid();
            if (orgStructure.Id == Guid.Empty || orgStructure.Id == null)
            {
                orgStructure.Id = Guid.NewGuid();
            }
            if (orgStructure.OrganizationBranchId == Guid.Empty || orgStructure.OrganizationBranchId == null)
            {
                orgStructure.OrganizationBranchId = (Guid)orgStructure.Id;
            }

            var orgStructure2 = new OrganizationalStructure
            {
                Id = (Guid)orgStructure.Id,
                OrganizationBranchId = orgStructure.OrganizationBranchId,
                //OrganizationProfileId = orgainzationProfile.Id,
                SubsidiaryOrganizationId = orgStructure.SubsidiaryOrganizationId,
                ParentStructureId = orgStructure.ParentStructureId,
                StructureName = orgStructure.StructureName,
                Order = orgStructure.Order,
                IsBranch = orgStructure.IsBranch,
                OfficeNumber = orgStructure.OfficeNumber,
                Weight = orgStructure.Weight,
                Remark = orgStructure.Remark,
                CreatedAt = DateTime.Now,
                isManageZone = orgStructure.isManageZone ?? false, // Default to false if null
                Type = orgStructure.Type.HasValue ? (Type)orgStructure.Type.Value : (Type?)null // Convert int? to enum Type?
            };


            await _dBContext.AddAsync(orgStructure2);
            await _dBContext.SaveChangesAsync();

            return 1;

        }
      
        public async Task<List<OrgStructureDto>> GetOrganizationStructures(Guid SubOrgId, Guid? BranchId)
        {
            var structures = await (from x in _dBContext.OrganizationalStructures
                                    .Include(x => x.ParentStructure)
                                    .Where(x => x.SubsidiaryOrganizationId == SubOrgId &&
                                                (BranchId == null || x.OrganizationBranchId == BranchId))
                                    select new
                                    {
                                        x.Id,
                                        x.OrganizationBranchId,
                                        x.SubsidiaryOrganizationId,
                                        ParentStructureName = x.ParentStructure != null ? x.ParentStructure.StructureName : null,
                                        ParentStructureId = x.ParentStructure != null ? x.ParentStructure.Id : (Guid?)null,
                                        x.StructureName,
                                        x.Order,
                                        x.Weight,
                                        x.IsBranch,
                                        x.OfficeNumber,
                                        ParentWeight = x.ParentStructure != null ? x.ParentStructure.Weight : (float?)null,
                                        x.Remark,
                                        x.Type,                                    
                                        x.isManageZone
                                    }).ToListAsync();

            var result = structures.Select(x => new OrgStructureDto
            {
                Id = x.Id,
                OrganizationBranchId = x.OrganizationBranchId,
                SubsidiaryOrganizationId = x.SubsidiaryOrganizationId,
                ParentStructureName = x.ParentStructureName,
                ParentStructureId = x.ParentStructureId,
                StructureName = x.StructureName,
                Order = x.Order,
                Weight = x.Weight,
                IsBranch = x.IsBranch,
                OfficeNumber = x.OfficeNumber,
                ParentWeight = x.ParentWeight,
                Remark = x.Remark,
                Type = x.Type.HasValue ? (int)x.Type.Value : (int?)null,
                TypeName = x.Type != null ? x.Type.ToString() : null, // Convert Type enum to string
                isManageZone = x.isManageZone
            }).ToList();

            foreach (var structure in result)
            {
                structure.BranchName = await _dBContext.OrganizationalStructures
                    .Where(x => x.Id == structure.OrganizationBranchId)
                    .Select(x => x.StructureName)
                    .FirstOrDefaultAsync();
            }

            return result;
        }

        public async Task<List<SelectListDto>> getParentStrucctureSelectList(Guid branchId)
        {
            List<SelectListDto> list = await (from x in _dBContext.OrganizationalStructures
                                              .Where(y => y.OrganizationBranchId == branchId && (!y.IsBranch || y.Id == branchId))
                                              select new SelectListDto
                                              {
                                                  Id = x.Id,
                                                  Name = x.StructureName + (x.IsBranch ? "( Branch )" : "")
                                              }).ToListAsync();

            if (!list.Any())
            {
                list = await (from x in _dBContext.OrganizationalStructures
                              .Where(y => y.Id == branchId)
                              select new SelectListDto
                              {
                                  Id = x.Id,
                                  Name = x.StructureName
                              }).ToListAsync();
            }

            return list;
        }


        public async Task<int> UpdateOrganizationalStructure(OrgStructureDto orgStructure)
        {
            var orgStructure2 = await _dBContext.OrganizationalStructures.FindAsync(orgStructure.Id);

            if (orgStructure2 == null)
            {
                return 0; // Handle case where the entity is not found
            }

            orgStructure2.OrganizationBranchId = orgStructure.OrganizationBranchId;
            orgStructure2.ParentStructureId = orgStructure.ParentStructureId;
            orgStructure2.StructureName = orgStructure.StructureName;
            orgStructure2.Order = orgStructure.Order;
            orgStructure2.Weight = orgStructure.Weight;
            orgStructure2.IsBranch = orgStructure.IsBranch;
            orgStructure2.OfficeNumber = orgStructure.OfficeNumber;
            orgStructure2.Remark = orgStructure.Remark;
            orgStructure2.RowStatus = orgStructure.RowStatus == 0 ? RowStatus.Active : RowStatus.InActive;

            // Ensure nullable fields default to false if null
            orgStructure2.isManageZone = orgStructure.isManageZone ?? false;
            orgStructure2.Type = orgStructure.Type.HasValue ? (Type)orgStructure.Type.Value : (Type?)null; // Convert int? to enum Type?;

            _dBContext.Entry(orgStructure2).State = EntityState.Modified;
            await _dBContext.SaveChangesAsync();

            return 1;
        }

        public async Task<ResponseMessage> DeleteOrganizationalStructure(Guid organizationStructurId)
        {
            try
            {
                var orgStructure = await _dBContext.OrganizationalStructures.FindAsync(organizationStructurId);

                if (orgStructure == null)
                {
                    return new ResponseMessage
                    {
                        Success = true,
                        Message = "Organization Structure Not Found!!!"
                    };
                }

                _dBContext.OrganizationalStructures.Remove(orgStructure);
                await _dBContext.SaveChangesAsync();

                return new ResponseMessage
                {
                    Success = true,
                    Message = "Organization Structure deleted Successfully!!"
                };
            }
            catch (Exception ex)
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = ex.Message,
                };
            }


        }

        public async Task<List<DiagramDto>> getDIagram(Guid? BranchId)
        {

            var orgStructures = _dBContext.OrganizationalStructures.Include(x => x.ParentStructure).Where(x => x.OrganizationBranchId == BranchId)
                                                 .ToList();//Where(x=>x.ParentStructureId==BranchId)
            var employess = _dBContext.Employees.ToList();
            var childs = new List<DiagramDto>();

            var parentStructure = _dBContext.OrganizationalStructures.Include(x => x.ParentStructure).FirstOrDefault(x => x.Id == BranchId);

            var DiagramDro = new DiagramDto()
            {
                data = new
                {
                    name = parentStructure.StructureName,
                    weight = "  ( " + Decimal.Round((decimal)(parentStructure.Weight), 2) + "% ",
                    head = employess.FirstOrDefault(x => x.OrganizationalStructureId == parentStructure.Id && x.Position == Position.Director)?.Title + " " +
                                       employess.FirstOrDefault(x => x.OrganizationalStructureId == parentStructure.Id && x.Position == Position.Director)?.FullName

                },
                label = parentStructure.StructureName,
                expanded = true,
                type = "organization",
                styleClass = "bg-success text-white",
                id = parentStructure.Id,
                order = parentStructure.Order,
                children = new List<DiagramDto>()

            };

            childs.Add(DiagramDro);

            var remainingStractures = orgStructures.Where(x => x.ParentStructureId != null).OrderBy(x => x.Order).Select(x => x.ParentStructureId).Distinct();

            foreach (var items in remainingStractures)
            {
                var children = orgStructures.Where(x => x.ParentStructureId == items).Select(x => new DiagramDto
                {
                    data = new
                    {
                        name = x.StructureName,
                        weight = "  ( " + Decimal.Round((decimal)((x.Weight / x.ParentStructure.Weight) * 100), 2) + "% of " + Decimal.Round((decimal)x.ParentStructure.Weight, 2) + " ) ",
                        head = employess.FirstOrDefault(x => x.OrganizationalStructureId == x.Id && x.Position == Position.Director)?.Title + " " +
                                       employess.FirstOrDefault(x => x.OrganizationalStructureId == x.Id && x.Position == Position.Director)?.FullName

                    },

                    label = x.StructureName,
                    expanded = true,
                    type = "organization",
                    styleClass = x.Order % 2 == 1 ? "bg-secondary text-white" : "bg-success text-white",
                    id = x.Id,
                    parentId = x.ParentStructureId,
                    order = x.Order,
                    children = new List<DiagramDto>()
                }).ToList();


                childs.AddRange(children);


            }
            for (var j = childs.Max(x => x.order); j >= 0; j--)
            {
                var childList = childs.Where(x => x.order == j).ToList();
                foreach (var item in childList)
                {

                    var org = childs.FirstOrDefault(x => x.id == item.parentId);

                    if (org != null)
                    {
                        org.children.Add(item);
                    }


                }
            }
            List<DiagramDto> result = new List<DiagramDto>();

            if (childs.Any())
            {
                result.Add(childs[0]);
            }
            return result;

        }



    }
}
