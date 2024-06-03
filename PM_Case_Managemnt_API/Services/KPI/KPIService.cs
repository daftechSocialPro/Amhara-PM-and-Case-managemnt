﻿using System.Net;
using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.KPI;
using PM_Case_Managemnt_API.Helpers;
using PM_Case_Managemnt_API.Models.KPI;

namespace PM_Case_Managemnt_API.Services.KPI
{
    public class KPIService : IKPIService
    {
        private readonly DBContext _dbContext;

        public KPIService(DBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ResponseMessage> AddKPI(KPIPostDto kpiPost)
        {
            try
            {
                KPIList kpi = new()
                {
                    Id = Guid.NewGuid(),
                    CreatedAt = DateTime.Now,
                    CreatedBy = kpiPost.CreatedBy,
                    Title = kpiPost.Title,
                    StartYear = kpiPost.StartYear,
                                        
                    ActiveYearsString = kpiPost.ActiveYearsString

                };

                if (!kpiPost.HasSubsidiaryOrganization)
                {

                    string output = string.Concat(kpiPost.EncoderOrganizationName.Split(' ')
                                              .Where(w => !string.IsNullOrWhiteSpace(w))
                                              .Select(w => char.ToUpper(w[0])));
                    string uniqueIdentifier = Guid.NewGuid().ToString("N").Substring(0, 5);


                    kpi.AccessCode = $"{output}-{uniqueIdentifier}";
                    kpi.EncoderOrganizationName = kpiPost.EncoderOrganizationName;
                    kpi.EvaluatorOrganizationName = kpiPost.EvaluatorOrganizationName;
                    //kpi.Url = kpiPost.Url;
                }
                else
                {

                   kpi.SubsidiaryOrganizationId = kpiPost.SubsidiaryOrganizationId;
                }

                

                //kpi.SetActiveYearsFromList(kpiPost.ActiveYears);

                await _dbContext.KPIs.AddAsync(kpi);
                await _dbContext.SaveChangesAsync();

                return new ResponseMessage
                {
                    Success = true,
                    Message = "KPI Added Successfully"
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


        public async Task<ResponseMessage> AddKPIDetail(KPIDetailsPostDto kpiDetailsPost)
        {
            try
            {
                var Kpi = await _dbContext.KPIs.FindAsync(kpiDetailsPost.KPIId);

                if (Kpi == null)
                {
                    return new ResponseMessage { Success = false, Message = "KPI Not Found" };
                }

                var kpiDetails = new List<KPIDetails>();

                foreach (var item in kpiDetailsPost.GoalGrouping)
                {
                    foreach (var k in item.Titles)
                    {
                        kpiDetails.Add(new KPIDetails
                        {
                            Id = Guid.NewGuid(),
                            CreatedAt = DateTime.Now,
                            CreatedBy = kpiDetailsPost.CreatedBy,
                            KPIId = kpiDetailsPost.KPIId,
                            MainGoal = kpiDetailsPost.Goal,
                            Title = k,
                        });
                    }
                }

                await _dbContext.KPIDetails.AddRangeAsync(kpiDetails);
                await _dbContext.SaveChangesAsync();

                return new ResponseMessage
                {
                    Success = true,
                    Message = "KPI Details Added Successfully"
                };

            }
            catch (Exception ex)
            {
                return new ResponseMessage { Success = false, Message = ex.Message };
            }
        }

        public async Task<ResponseMessage> AddKPIData(List<KPIDataPostDto> kpiDataPost)
        {
            try
            {
                var kpiData = new List<KPIData>();
                foreach (var item in kpiDataPost)
                {
                    var KpiDetail = await _dbContext.KPIDetails.FindAsync(item.KPIDetailId);

                    if (KpiDetail == null)
                    {
                        return new ResponseMessage { Success = false, Message = "KPI Detail Not Found" };
                    }

                   
                    foreach (var k in item.Datas)
                    {
                        kpiData.Add(new KPIData
                        {
                            Id = Guid.NewGuid(),
                            CreatedAt = DateTime.Now,
                            CreatedBy = item.CreatedBy,
                            Year = k.Year,
                            Data = k.Data,
                            KPIDetailId = item.KPIDetailId
                        });
                    }
                }
                


                await _dbContext.KPIDatas.AddRangeAsync(kpiData);
                await _dbContext.SaveChangesAsync();

                return new ResponseMessage
                {
                    Success = true,
                    Message = "KPI Datas Added Successfully"
                };
            }
            catch (Exception ex)
            {
                return new ResponseMessage { Success = false, Message = ex.Message };
            }
        }

        public async Task<ResponseMessage<List<KPIGetDto>>> GetKPIs()
        {
            var response = new ResponseMessage<List<KPIGetDto>>();
            var kpis = await _dbContext.KPIs.Select(x => new KPIGetDto
            {
                Title = x.Title,
                StartYear = x.StartYear,
                ActiveYearsString = x.ActiveYearsString,
                EncoderOrganizationName = x.EncoderOrganizationName,
                EvaluatorOrganizationName = x.EvaluatorOrganizationName,
                CreatedBy = x.CreatedBy,
                Url = x.Url,
                Id = x.Id
                
            }).ToListAsync();

            response.Message = "Operation Successful.";
            response.Data = kpis;
            response.Success = true;
            
            return response;
        }

        public async Task<ResponseMessage<KPIGetDto>> GetKPIById(Guid id)
        {
            var response = new ResponseMessage<KPIGetDto>();
            var kpis = await _dbContext.KPIs
                        .Where(x => x.Id == id)
                        .Select(x => new KPIGetDto
                        {
                            Id = x.Id,
                            Title = x.Title,
                            StartYear = x.StartYear,
                            ActiveYearsString = x.ActiveYearsString,
                            EncoderOrganizationName = x.EncoderOrganizationName,
                            EvaluatorOrganizationName = x.EvaluatorOrganizationName,
                            CreatedBy = x.CreatedBy,
                            Url = x.Url,
                            SubsidiaryOrganizationId = x.SubsidiaryOrganizationId,
                            AccessCode = x.AccessCode,
                            HasSubsidiaryOrganization = x.HasSubsidiaryOrganization,
                            KpiDetails = _dbContext.KPIDetails
                                .Where(d => d.KPIId == x.Id) 
                                .GroupBy(d => d.MainGoal)
                                .Select(group => new GroupedKPIDetailsGetDto
                                {
                                    MainGoal = group.Key,
                                    Details = group.Select(d => new KPIDetailsGetDto
                                    {
                                        Id = d.Id,
                                        Title = d.Title,
                                        MainGoal = d.MainGoal,
                                        KPIDatas = _dbContext.KPIDatas
                                            .Where(z => z.KPIDetailId == d.Id)
                                            .Select(z => new KPIDataGetDto
                                            {
                                                Id = z.Id,
                                                Year = z.Year,
                                                Data = z.Data,
                                            }).ToList()
                                    }).ToList()
                                }).ToList()
                        })
                        .FirstOrDefaultAsync();
            if (kpis == null)
            {
                response.Message = "Error";
                response.Data = null;
                response.Success = false;
                response.ErrorCode = HttpStatusCode.NotFound.ToString();
                return response;
            }
            kpis.ActiveYears = kpis.ActiveYearsString?.Split(',').Select(int.Parse).ToList() ?? new List<int>();

            response.Message = "Operation Successful.";
            response.Data = kpis;
            response.Success = true;
            
            return response;
        }
        public async Task<ResponseMessage> UpdateKPI(KPIGetDto kpiGet)
        {
            try
            {
                var kpi = await _dbContext.KPIs.FindAsync(kpiGet.Id);

                if (kpi == null)
                {
                    return new ResponseMessage { Success = false, Message = "KPI Not Found" };
                }
                kpi.StartYear = kpiGet.StartYear;
                kpi.Title = kpiGet.Title;
                kpi.EncoderOrganizationName = kpiGet.EncoderOrganizationName;
                kpi.EvaluatorOrganizationName = kpiGet.EvaluatorOrganizationName;
                kpi.Url = kpiGet.Url;
                //if (kpiGet.ActiveYears.Count > 0)
                //{
                //    kpi.SetActiveYearsFromList(kpiGet.ActiveYears);
                //}
                kpi.ActiveYearsString = kpiGet.ActiveYearsString;

                await _dbContext.SaveChangesAsync();

                return new ResponseMessage
                {
                    Success = true,
                    Message = "KPI Updated Successfully"
                };



            }
            catch (Exception ex)
            {
                return new ResponseMessage { Success = false, Message = ex.Message };
            }

        }

        public async Task<ResponseMessage> UpdateKPIDetail(KPIDetailsGetDto kpiDetailsGet)
        {
            try
            {
                var kpiDetail = await _dbContext.KPIDetails.FindAsync(kpiDetailsGet.Id);

                if (kpiDetail == null)
                {
                    return new ResponseMessage { Success = false, Message = "KPI Detail Not Found" };
                }

                kpiDetail.Title = kpiDetailsGet.Title;
                kpiDetail.MainGoal = kpiDetailsGet.MainGoal;

                await _dbContext.SaveChangesAsync();

                return new ResponseMessage
                {
                    Success = true,
                    Message = "KPI Detail Updated Successfully"
                };

            }
            catch (Exception ex)
            {
                return new ResponseMessage { Success = false, Message = ex.Message };
            }
        }

        public async Task<ResponseMessage> LoginKpiDataEncoding(string accessCode)
        {

            var kpiId = await _dbContext.KPIs.AsNoTracking().Where(x => x.AccessCode == accessCode).Select(x => x.Id).FirstOrDefaultAsync();
            
            if(kpiId == null)
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = "Access Code Is Invalid"
                };
            }

            return new ResponseMessage
            {
                Success = true,
                Message = "Log In Successfull",
                Data = kpiId.ToString()

            };

        }
    }
}
