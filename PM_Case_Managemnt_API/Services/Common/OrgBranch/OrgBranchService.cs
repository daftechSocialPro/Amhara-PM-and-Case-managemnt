using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Models.Common;


namespace PM_Case_Managemnt_API.Services.Common
{
    public class OrgBranchService : IOrgBranchService
    {

        private readonly DBContext _dBContext;
        public OrgBranchService(DBContext context)
        {
            _dBContext = context;
        }

        public async Task<int> CreateOrganizationalBranch(OrgBranchDto organizationBranch)
        {

            var orgProfile = _dBContext.OrganizationProfile.FirstOrDefault();

            if (orgProfile != null)
            {
                var orgBranch = new OrganizationBranch
                {
                    Id = Guid.NewGuid(),
                    Name = organizationBranch.Name,
                    Address = organizationBranch.Address,
                    PhoneNumber = organizationBranch.PhoneNumber,
                    Remark = organizationBranch.Remark,
                    CreatedAt = DateTime.Now,
                    OrganizationProfileId = orgProfile.Id
                };
                await _dBContext.AddAsync(orgBranch);
                await _dBContext.SaveChangesAsync();
            }
            return 1;

        }
        public async Task<List<OrgStructureDto>> GetOrganizationBranches()
        {



            var orgStructures = await _dBContext.OrganizationalStructures.Where(x => x.IsBranch).Select(x => new OrgStructureDto
            {
                Id = x.Id,
                BranchName = x.ParentStructure.IsBranch ? x.ParentStructure.StructureName : "",
                OrganizationBranchId = x.ParentStructure.IsBranch ? x.ParentStructure.Id : Guid.NewGuid(),
                ParentStructureName = x.ParentStructure.StructureName,
                ParentStructureId = x.ParentStructure.Id,
                StructureName = x.StructureName,
                OfficeNumber = x.OfficeNumber,
                Order = x.Order,
                Weight = x.Weight,
                IsBranch = x.IsBranch,
                ParentWeight = x.ParentStructure.Weight,
                Remark = x.Remark
            }).ToListAsync();




            return orgStructures;
        }

        public async Task<List<SelectListDto>> getBranchSelectList()
        {

            List<SelectListDto> list = await (from x in _dBContext.OrganizationalStructures.Where(x=>x.RowStatus == RowStatus.Active && x.IsBranch)
                                              select new SelectListDto
                                              {
                                                  Id = x.Id,
                                                  Name = x.StructureName + (x.ParentStructure==null ? "( Head Office )" : "")

                                              }).ToListAsync();


            return list;
        }

        public async Task<int> UpdateOrganizationBranch(OrgBranchDto organizationBranch)
        {

            var orgBranch = _dBContext.OrganizationBranches.Find(organizationBranch.Id);

            orgBranch.Name = organizationBranch.Name;
            orgBranch.Address = organizationBranch.Address;
            orgBranch.Remark = organizationBranch.Remark;
            orgBranch.PhoneNumber = organizationBranch.PhoneNumber;
            orgBranch.RowStatus = organizationBranch.RowStatus==0?RowStatus.Active:RowStatus.InActive;

            _dBContext.Entry(orgBranch).State = EntityState.Modified;
            await _dBContext.SaveChangesAsync();
            return 1;

        }
    }
}
