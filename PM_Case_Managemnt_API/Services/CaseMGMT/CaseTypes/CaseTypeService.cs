using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.CaseDto;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Models.CaseModel;
using System.Linq;

namespace PM_Case_Managemnt_API.Services.CaseService.CaseTypes
{

    public class CaseTypeService : ICaseTypeService
    {

        private readonly DBContext _dbContext;
        public CaseTypeService(DBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task Add(CaseTypePostDto caseTypeDto)
        {
            try
            {
                CaseType caseType = new()
                {
                    Id = Guid.NewGuid(),
                    CreatedAt = DateTime.Now,
                    RowStatus = Models.Common.RowStatus.Active,
                    CreatedBy = caseTypeDto.CreatedBy,
                    CaseTypeTitle = caseTypeDto.CaseTypeTitle,
                    Code = caseTypeDto.Code,
                    TotlaPayment = caseTypeDto.TotalPayment,
                    Counter = caseTypeDto.Counter,
                    MeasurementUnit = Enum.Parse<TimeMeasurement>(caseTypeDto.MeasurementUnit),
                    CaseForm = string.IsNullOrEmpty(caseTypeDto.CaseForm) ? _dbContext.CaseTypes.Find(caseTypeDto.ParentCaseTypeId).CaseForm : Enum.Parse<CaseForm>(caseTypeDto.CaseForm),
                    Remark = caseTypeDto.Remark,
                    OrderNumber = caseTypeDto.OrderNumber,
                    ParentCaseTypeId = caseTypeDto.ParentCaseTypeId
                };

                if (caseTypeDto.ParentCaseTypeId != null)
                    caseType.ParentCaseTypeId = caseTypeDto.ParentCaseTypeId;

                await _dbContext.AddAsync(caseType);
                await _dbContext.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<CaseTypeGetDto>> GetAll()
        {
            try
            {
                List<CaseType> caseTypes = await _dbContext.CaseTypes.Include(p => p.ParentCaseType).Where(x=>x.ParentCaseTypeId==null).ToListAsync();
                List<CaseTypeGetDto> result = new();

                foreach (CaseType caseType in caseTypes)
                {
                    result.Add(new CaseTypeGetDto
                    {
                        Id = caseType.Id,
                        CaseTypeTitle = caseType.CaseTypeTitle,
                        Code = caseType.Code,
                        CreatedAt = caseType.CreatedAt.ToString(),
                        CreatedBy = caseType.CreatedBy,
                        MeasurementUnit = caseType.MeasurementUnit.ToString(),
                        Remark = caseType.Remark,
                        RowStatus = caseType.RowStatus.ToString(),
                        Counter = caseType.Counter,

                        TotalPayment = caseType.TotlaPayment,
                        Children = _dbContext.CaseTypes.Where(x=>x.ParentCaseTypeId == caseType.Id).Select(y=> new CaseTypeGetDto
                        {
                            Id = y.Id,
                            CaseTypeTitle = y.CaseTypeTitle,
                            Code = y.Code,
                            CreatedAt = y.CreatedAt.ToString(),
                            CreatedBy = y.CreatedBy,
                            Counter =y.Counter,
                            MeasurementUnit = y.MeasurementUnit.ToString(),
                            Remark = y.Remark,
                            RowStatus = y.RowStatus.ToString(),
                            TotalPayment = y.TotlaPayment,

                        }).ToList()
                        //ParentCaseType = caseType.ParentCaseType
                    });
                }

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<List<SelectListDto>> GetAllByCaseForm(string caseForm)
        {
            try
            {
                List<CaseType> caseTypes = await _dbContext.CaseTypes.Include(p => p.ParentCaseType).Where(x => x.CaseForm == Enum.Parse<CaseForm>(caseForm) && x.ParentCaseTypeId==null).ToListAsync();
                List<SelectListDto> result = new();

                foreach (CaseType caseType in caseTypes)
                {
                    result.Add(new SelectListDto
                    {
                        Id = caseType.Id,
                        Name = caseType.CaseTypeTitle,


                    });
                }

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public async Task<List<SelectListDto>> GetAllSelectList()
        {

            return await (from c in _dbContext.CaseTypes
                          select new SelectListDto
                          {
                              Id = c.Id,
                              Name = c.CaseTypeTitle

                          }).ToListAsync();

        }
        public async Task<List<SelectListDto>> GetFileSettigs(Guid caseTypeId)
        {

            return await (from f in _dbContext.FileSettings.Where(x => x.CaseTypeId == caseTypeId)
                          select new SelectListDto
                          {

                              Id = f.Id,
                              Name = f.FileName

                          }).ToListAsync();

        }

        public int GetChildOrder(Guid caseTypeId)
        {

            var childCases = _dbContext.CaseTypes.Where(x => x.ParentCaseTypeId == caseTypeId).OrderByDescending(x => x.OrderNumber).ToList();

            if (!childCases.Any())
                return 1;
            else 
            return (int)childCases.FirstOrDefault().OrderNumber+1;

        }


    }
}
