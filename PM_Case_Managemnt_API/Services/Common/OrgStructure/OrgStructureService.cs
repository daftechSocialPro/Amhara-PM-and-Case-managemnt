using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Helpers;
using PM_Case_Managemnt_API.Models.Common;

namespace PM_Case_Managemnt_API.Services.Common
{
    public class OrgStructureService : IOrgStructureService
    {
        private readonly DBContext _dBContext;
        public OrgStructureService(DBContext context)
        {
            _dBContext = context;
        }

        public async Task<ResponseMessage> CreateOrganizationalStructure(OrgStructureDto orgStructure)
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
                OrganizationType= orgStructure.OrganizationType,

            };
            var parent = await _dBContext.OrganizationalStructures.Where(x => x.Id == orgStructure.ParentStructureId).FirstOrDefaultAsync();
            if (parent == null)
            {
                return new ResponseMessage
                {
                    Success = true,
                    Message = "Parent Organization  not found!!!"
                };
            }
            else if (orgStructure.OrganizationType== OrganizationType.Directorate)
            {
                if(parent.OrganizationType!=OrganizationType.Sector)
                {
                    return new ResponseMessage
                    {
                        Success = true,
                        Message = "Parent Organization Should be Sector!!! "
                    };
                }
              
            }
           else if (orgStructure.OrganizationType == OrganizationType.Sector)
            {
                if (parent.OrganizationType != OrganizationType.Biro)
                {
                    return new ResponseMessage
                    {
                        Success = true,
                        Message = "Parent Organization Should be Biro!!! "
                    };
                }

            }
            else if (orgStructure.OrganizationType == OrganizationType.Group || orgStructure.OrganizationType == OrganizationType.Zone || orgStructure.OrganizationType == OrganizationType.Zone || orgStructure.OrganizationType == OrganizationType.Zone)
            {
                if (parent.OrganizationType != OrganizationType.Directorate)
                {
                    return new ResponseMessage
                    {
                        Success = true,
                        Message = "Parent Organization Should be Directorate!!! "
                    };
                }

            }
            await _dBContext.AddAsync(orgStructure2);
            await _dBContext.SaveChangesAsync();
            return new ResponseMessage
            {
                Success = true,
                Message = "Organization Structure Saved Successfully!!"
            };
            

        }
        public async Task<List<OrgStructureDto>> GetOrganizationStructures(Guid SubOrgId, Guid? BranchId)
        {

            List<OrgStructureDto> structures = await (from x in _dBContext.OrganizationalStructures.Include(x => x.ParentStructure).Where(x => x.SubsidiaryOrganizationId == SubOrgId && x.OrganizationBranchId == BranchId)

                                                      select new OrgStructureDto
                                                      {
                                                          Id = x.Id,
                                                          OrganizationBranchId = x.OrganizationBranchId,
                                                          SubsidiaryOrganizationId = x.SubsidiaryOrganizationId,
                                                          ParentStructureName = x.ParentStructure.StructureName,
                                                          ParentStructureId = x.ParentStructure.Id,
                                                          StructureName = x.StructureName,
                                                          Order = x.Order,
                                                          Weight = x.Weight,
                                                          IsBranch = x.IsBranch,
                                                          OfficeNumber = x.OfficeNumber,
                                                          ParentWeight = x.ParentStructure.Weight,
                                                          Remark = x.Remark,
                                                         // OrganizationType=x.OrganizationType,

                                                      }).ToListAsync();
            foreach (var structure in structures)
            {

                structure.BranchName = await _dBContext.OrganizationalStructures.Where(x => x.Id == structure.OrganizationBranchId).Select(x => x.StructureName).FirstOrDefaultAsync();
            }



            return structures;
        }

        public async Task<List<SelectListDto>> getParentStrucctureSelectList(Guid branchId)
        {

            List<SelectListDto> list = await (from x in _dBContext.OrganizationalStructures.Where(y => y.OrganizationBranchId == branchId && (!y.IsBranch || y.Id == branchId))
                                              select new SelectListDto
                                              {
                                                  Id = x.Id,
                                                  Name = x.StructureName + (x.IsBranch ? "( Branch )" : "")

                                              }).ToListAsync();


            if (!list.Any())
            {
                list = await (from x in _dBContext.OrganizationalStructures.Where(y => y.Id == branchId)
                              select new SelectListDto
                              {
                                  Id = x.Id,
                                  Name = x.StructureName

                              }).ToListAsync();
            }

            return list;
        }



        public async Task<ResponseMessage> UpdateOrganizationalStructure(OrgStructureDto orgStructure)
        {

            var orgStructure2 = await _dBContext.OrganizationalStructures.FindAsync(orgStructure.Id);

            orgStructure2.OrganizationBranchId = orgStructure.OrganizationBranchId;
            orgStructure2.ParentStructureId = orgStructure.ParentStructureId;
            orgStructure2.StructureName = orgStructure.StructureName;
            orgStructure2.Order = orgStructure.Order;
            orgStructure2.Weight = orgStructure.Weight;
            orgStructure2.IsBranch = orgStructure.IsBranch;
            orgStructure2.OfficeNumber = orgStructure.OfficeNumber;
            orgStructure2.Remark = orgStructure.Remark;
            orgStructure2.RowStatus = orgStructure.RowStatus == 0 ? RowStatus.Active : RowStatus.InActive;
            //orgStructure2.SubsidiaryOrganizationId= orgStructure.SubsidiaryOrganizationId;
            orgStructure2.OrganizationType = orgStructure.OrganizationType;
            var parent = await _dBContext.OrganizationalStructures.Where(x => x.Id == orgStructure.ParentStructureId).FirstOrDefaultAsync();
            if (parent == null)
            {
                return new ResponseMessage
                {
                    Success = true,
                    Message = "Parent Organization  not found!!!"
                };
            }
           else if (orgStructure.OrganizationType == OrganizationType.Directorate)
            {
                if (parent.OrganizationType != OrganizationType.Sector)
                {
                    return new ResponseMessage
                    {
                        Success = true,
                        Message = "Parent Organization  Should be Sector!!! "
                    };
                }

            }
            else if (orgStructure.OrganizationType == OrganizationType.Sector)
            {
                if (parent.OrganizationType != OrganizationType.Biro)
                {
                    return new ResponseMessage
                    {
                        Success = true,
                        Message = "Parent Organization  Should be Biro!!! "
                    };
                }

            }
            else if (orgStructure.OrganizationType == OrganizationType.Group || orgStructure.OrganizationType == OrganizationType.Zone || orgStructure.OrganizationType == OrganizationType.Zone || orgStructure.OrganizationType == OrganizationType.Zone)
            {
                if (parent.OrganizationType != OrganizationType.Directorate)
                {
                    return new ResponseMessage
                    {
                        Success = true,
                        Message = "Parent Should be Directorate!!! "
                    };
                }

            }
           
            await _dBContext.AddAsync(orgStructure2);
            await _dBContext.SaveChangesAsync();

            _dBContext.Entry(orgStructure2).State = EntityState.Modified;
            await _dBContext.SaveChangesAsync();
            return new ResponseMessage
            {
                Success = true,
                Message = "Organization Structure updated Successfully!!"
            };
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
