﻿using Azure;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Helpers;
using PM_Case_Managemnt_API.Models.Common;
using PM_Case_Managemnt_API.Models.Common.Organization;

namespace PM_Case_Managemnt_API.Services.Common
{
    public class BudgetYearService : IBudgetyearService
    {
        private readonly DBContext _dBContext;
        public BudgetYearService(DBContext context)
        {
            _dBContext = context;
        }

        public async Task<ResponseMessage> CreateProgramBudgetYear(ProgramBudgetYearDto programBudgetYear)
        {
            ProgramBudgetYear addProgramBudgetYear = new()
            {
                Id = Guid.NewGuid(),
                Name = programBudgetYear.Name,
                FromYear = programBudgetYear.FromYear,
                ToYear = programBudgetYear.ToYear,
                SubsidiaryOrganizationId = programBudgetYear.SubsidiaryOrganizationId,
                Remark = programBudgetYear.Remark,
                CreatedBy = programBudgetYear.CreatedBy
            };

            await _dBContext.AddAsync(addProgramBudgetYear);
            await _dBContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Message = "Program Budget Year Created Successfully",
                Success = true
            };

        }

        public async Task<ResponseMessage> EditProgramBudgetYear(ProgramBudgetYearDto programBudgetYear)
        {
            ProgramBudgetYear? editProgramBudgetYear = await _dBContext.ProgramBudgetYears.FindAsync(programBudgetYear.Id);

            if(editProgramBudgetYear == null)
            {
                return new ResponseMessage
                {
                    Message = "Program Budget Year Not Found",
                    Success = true
                };
            }

            editProgramBudgetYear.Name = programBudgetYear.Name;
            editProgramBudgetYear.FromYear = programBudgetYear.FromYear;
            editProgramBudgetYear.ToYear = programBudgetYear.ToYear;
            editProgramBudgetYear.Remark = programBudgetYear.Remark;

            await _dBContext.SaveChangesAsync();


            return new ResponseMessage
            {
                Message = "Program Budget Year Successfully Edited",
                Success = true
            };

        }

        public async Task<ResponseMessage> DeleteProgramBudgetYear(Guid programBudgetYeatId)
        {
            ProgramBudgetYear? editProgramBudgetYear = await _dBContext.ProgramBudgetYears.FindAsync(programBudgetYeatId);

            if (editProgramBudgetYear == null)
            {
                return new ResponseMessage
                {
                    Message = "Program Budget Year Not Found",
                    Success = true
                };
            }

            _dBContext.ProgramBudgetYears.Remove(editProgramBudgetYear);
            await _dBContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Message = "Program Budget Year Deleted Successfully",
                Success = true
            };
        }

        public async Task<ResponseMessage<List<ProgramBudgetYear>>> GetProgramBudgetYears(Guid subOrgId)
        {
            var response = new ResponseMessage<List<ProgramBudgetYear>>();

            List<ProgramBudgetYear> result = await _dBContext.ProgramBudgetYears.Where(x => x.SubsidiaryOrganizationId == subOrgId).Include(x => x.BudgetYears).ToListAsync();
            
            response.Message = "Operation Successfull";
            response.Data = result;
            response.Success = true;

            return response;
        }

        public async Task<ResponseMessage<List<SelectListDto>>> getProgramBudgetSelectList(Guid subOrgId)
        {
            
            var response = new ResponseMessage<List<SelectListDto>>();
            List<SelectListDto> list = await (from x in _dBContext.ProgramBudgetYears.Where(x => x.SubsidiaryOrganizationId.Equals(subOrgId))
                                              select new SelectListDto
                                              {
                                                  Id = x.Id,
                                                  Name = x.Name + " ( " + x.FromYear + " - " + x.ToYear + " )"

                                              }).ToListAsync();

            response.Message = "Operation Successfull";
            response.Data = list;
            response.Success = true;

            return response;
        }


        //budget year
        public async Task<ResponseMessage> CreateBudgetYear(BudgetYearDto BudgetYear)
        {


            BudgetYear budgetYear = new BudgetYear();

            budgetYear.Id = Guid.NewGuid();

            if (!string.IsNullOrEmpty(BudgetYear.FromDate))
            {
                string[] startDate = BudgetYear.FromDate.Split(new string[] { "/" }, StringSplitOptions.RemoveEmptyEntries);
                DateTime ShouldStartPeriod = Convert.ToDateTime(XAPI.EthiopicDateTime.GetGregorianDate(Int32.Parse(startDate[0]), Int32.Parse(startDate[1]), Int32.Parse(startDate[2])));
                budgetYear.FromDate = ShouldStartPeriod;
            }

            if (!string.IsNullOrEmpty(BudgetYear.ToDate))
            {

                string[] endDate = BudgetYear.ToDate.Split(new string[] { "/" }, StringSplitOptions.RemoveEmptyEntries);
                DateTime ShouldEnd = Convert.ToDateTime(XAPI.EthiopicDateTime.GetGregorianDate(Int32.Parse(endDate[0]), Int32.Parse(endDate[1]), Int32.Parse(endDate[2])));
                budgetYear.ToDate = ShouldEnd;
            }
            budgetYear.Remark = BudgetYear.Remark;
            budgetYear.Year = BudgetYear.Year;
            budgetYear.ProgramBudgetYearId = BudgetYear.ProgramBudgetYearId;
            budgetYear.CreatedBy = BudgetYear.CreatedBy;



            await _dBContext.AddAsync(budgetYear);
            await _dBContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Message = "Budget Year Created Successfully",
                Success = true
            };

        }

        public async Task<ResponseMessage> EditBudgetYear(BudgetYearDto BudgetYear)
        {
            BudgetYear? budgetYear = await _dBContext.BudgetYears.FindAsync(BudgetYear.Id);


            if(budgetYear == null)
            {
                return new ResponseMessage
                {
                    Message = "Budget Year Not Found",
                    Success = false
                };
            }

            if (!string.IsNullOrEmpty(BudgetYear.FromDate))
            {
                string[] startDate = BudgetYear.FromDate.Split(new string[] { "/" }, StringSplitOptions.RemoveEmptyEntries);
                DateTime ShouldStartPeriod = Convert.ToDateTime(XAPI.EthiopicDateTime.GetGregorianDate(Int32.Parse(startDate[0]), Int32.Parse(startDate[1]), Int32.Parse(startDate[2])));
                budgetYear.FromDate = ShouldStartPeriod;
            }

            if (!string.IsNullOrEmpty(BudgetYear.ToDate))
            {

                string[] endDate = BudgetYear.ToDate.Split(new string[] { "/" }, StringSplitOptions.RemoveEmptyEntries);
                DateTime ShouldEnd = Convert.ToDateTime(XAPI.EthiopicDateTime.GetGregorianDate(Int32.Parse(endDate[0]), Int32.Parse(endDate[1]), Int32.Parse(endDate[2])));
                budgetYear.ToDate = ShouldEnd;
            }
            budgetYear.Remark = BudgetYear.Remark;
            budgetYear.Year = BudgetYear.Year;
            
            
            
            await _dBContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Message = "Budget Year Updated Successfully",
                Success = true
            };
        }

        public async Task<ResponseMessage> DeleteBudgetYear(Guid budgetYearId)
        {
            
            BudgetYear budgetYear = await _dBContext.BudgetYears.FindAsync(budgetYearId);

            if (budgetYear == null)
            {
                return new ResponseMessage
                {
                    Message = "Budget Year Not Found",
                    Success = false
                };
            }


            _dBContext.BudgetYears.Remove(budgetYear);
            await _dBContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Message = "Budget Year Successfully Deleted",
                Success = true
            };
        }



        public async Task<ResponseMessage<List<BudgetYearDto>>> GetBudgetYears(Guid programBudgetYearId)
        {

            var response = new ResponseMessage<List<BudgetYearDto>>();


            var budgetYears = await _dBContext.BudgetYears.Where(x => x.ProgramBudgetYearId == programBudgetYearId)
                                .Select(x => new BudgetYearDto
                                {
                                    Id = x.Id,
                                    Year = x.Year,
                                    FromDate = XAPI.EthiopicDateTime.GetEthiopicDate(x.FromDate.Day,x.FromDate.Month,x.FromDate.Year),
                                    ToDate = XAPI.EthiopicDateTime.GetEthiopicDate(x.ToDate.Day,x.ToDate.Month,x.ToDate.Year),
                                    ProgramBudgetYearId = x.ProgramBudgetYearId,
                                    Remark = x.Remark,
                                    CreatedBy = x.CreatedBy,

                                }).ToListAsync();

            response.Message = "Operation Successfull";
            response.Data = budgetYears;
            response.Success = true;

            return response;
        }

        public async Task<ResponseMessage<List<SelectListDto>>> getBudgetSelectList()
        {

            var response = new ResponseMessage<List<SelectListDto>>();


            List<SelectListDto> list = await (from x in _dBContext.BudgetYears
                                              select new SelectListDto
                                              {
                                                  Id = x.Id,
                                                  Name = x.Year.ToString() + " (" + " ) ( " + x.RowStatus + ")"

                                              }).ToListAsync();

            response.Message = "Operation Successfull";
            response.Data = list;
            response.Success = true;

            return response;
        }

        public async Task<ResponseMessage<List<SelectListDto>>> GetBudgetYearsFromProgramId(Guid ProgramId)
        {

            var response = new ResponseMessage<List<SelectListDto>>();

            var program = _dBContext.Programs.Find(ProgramId);

            List<SelectListDto> result =  await (from x in _dBContext.BudgetYears.Where(x=>x.ProgramBudgetYearId==program.ProgramBudgetYearId)
                          select new SelectListDto
                          {
                              Id = x.Id,
                              Name = x.Year.ToString()

                          }).ToListAsync();

            response.Message = "Operation Successfull.";
            response.Success = true;
            response.Data = result;

            return response;
        }




            


    }
}
