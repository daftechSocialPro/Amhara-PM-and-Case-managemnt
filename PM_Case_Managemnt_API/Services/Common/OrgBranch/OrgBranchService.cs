using System.Net;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Validations.Rules;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.DTOS.PM;
using PM_Case_Managemnt_API.Helpers;
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

        public async Task<ResponseMessage<int>> CreateOrganizationalBranch(OrgBranchDto organizationBranch)
        {

            var response = new ResponseMessage<int>();
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

            response.Message = "Operation Successful.";
            response.Success = true;
            response.Data = 1;
            
            return response;

        }
        public async Task<ResponseMessage<List<OrgStructureDto>>> GetOrganizationBranches(Guid SubOrgId)
        {


            var response = new ResponseMessage<List<OrgStructureDto>>();
            var orgStructures = await _dBContext.OrganizationalStructures.Where(x => x.SubsidiaryOrganizationId == SubOrgId && x.IsBranch).Select(x => new OrgStructureDto
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


            response.Message = "Operation Successful.";
            response.Success = true;
            response.Data = orgStructures;

            return response;
        }

        public async Task<ResponseMessage<List<SelectListDto>>> getBranchSelectList(Guid SubOrgId)
        {
            var response = new ResponseMessage<List<SelectListDto>>();
            List<SelectListDto> list = await (from x in _dBContext.OrganizationalStructures.Where(x=> x.SubsidiaryOrganizationId == SubOrgId && x.RowStatus == RowStatus.Active && x.IsBranch)
                                              select new SelectListDto
                                              {
                                                  Id = x.Id,
                                                  Name = x.StructureName + (x.ParentStructure==null ? "( Head Office )" : "")

                                              }).ToListAsync();

            response.Message = "Operation Successful.";
            response.Success = true;
            response.Data = list;


            return response;
        }

        public async Task<ResponseMessage<int>> UpdateOrganizationBranch(OrgBranchDto organizationBranch)
        {

            var response = new ResponseMessage<int>();
            var orgBranch = _dBContext.OrganizationalStructures.Where(x => x.Id == organizationBranch.Id).FirstOrDefault();

            if (orgBranch == null)
            {
                
                response.Message = "Branch not found";
                response.Data = -1;
                response.Success = false;
                response.ErrorCode = HttpStatusCode.InternalServerError.ToString();

                return response;
            }
            
            orgBranch.StructureName = organizationBranch.Name;
            
            orgBranch.Remark = organizationBranch.Remark;
            
            orgBranch.RowStatus = organizationBranch.RowStatus==0?RowStatus.Active:RowStatus.InActive;

            _dBContext.Entry(orgBranch).State = EntityState.Modified;
            await _dBContext.SaveChangesAsync();

            response.Message = "Operation Successful.";
            response.Data = 1;
            response.Success = true;
            
            return response;

        }
    }
}
