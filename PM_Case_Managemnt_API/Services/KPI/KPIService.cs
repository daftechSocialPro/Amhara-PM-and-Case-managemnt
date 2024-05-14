using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.KPI;
using PM_Case_Managemnt_API.Helpers;
using PM_Case_Managemnt_API.Models.KPI;

namespace PM_Case_Managemnt_API.Services.KPI
{
    public class KPIService
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
                    EncoderOrganizationName = kpiPost.EncoderOrganizationName,
                    EvaluatorOrganizationName = kpiPost.EvaluatorOrganizationName,
                    Url = kpiPost.Url,

                };

                kpi.SetActiveYearsFromList(kpiPost.ActiveYears);

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
                            MainGoal = item.Goal,
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

        public async Task<ResponseMessage> AddKPIData(KPIDataPostDto kpiDataPost)
        {
            try
            {
                var KpiDetail = await _dbContext.KPIDetails.FindAsync(kpiDataPost.KPIDetailId);

                if (KpiDetail == null)
                {
                    return new ResponseMessage { Success = false, Message = "KPI Detail Not Found" };
                }

                var kpiData = new List<KPIData>();


                foreach (var k in kpiDataPost.Datas)
                {
                    kpiData.Add(new KPIData
                    {
                        Id = Guid.NewGuid(),
                        CreatedAt = DateTime.Now,
                        CreatedBy = kpiDataPost.CreatedBy,
                        Year = k.Year,
                        Data = k.Data
                    });
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

        public async Task<List<KPIGetDto>> GetKPIs()
        {
            var kpis = await _dbContext.KPIs.Select(x => new KPIGetDto
            {
                Title = x.Title,
                StartYear = x.StartYear,
                ActiveYears = x.ActiveYears,
                EncoderOrganizationName = x.EncoderOrganizationName,
                EvaluatorOrganizationName = x.EvaluatorOrganizationName,
                CreatedBy = x.CreatedBy,
                Url = x.Url,
                Id = x.Id,
                KpiDetails = _dbContext.KPIDetails.Where(x => x.KPIId == x.Id).Select(y => new KPIDetailsGetDto
                {
                    Id = y.Id,
                    Title = y.Title,
                    MainGoal = y.MainGoal,
                    KPIDatas = _dbContext.KPIDatas.Where(x => x.KPIDetailId == y.Id).Select(z => new KPIDataGetDto
                    {
                        Id = z.Id,
                        Year = z.Year,
                        Data = z.Data,
                    }).ToList(),

                }).ToList(),

            }).ToListAsync();

            return kpis;
        }

        public async Task<KPIGetDto> GetKPIById(Guid id)
        {
            var kpis = await _dbContext.KPIs.Where(x => x.Id == id).Select(x => new KPIGetDto
            {
                Title = x.Title,
                StartYear = x.StartYear,
                ActiveYears = x.ActiveYears,
                EncoderOrganizationName = x.EncoderOrganizationName,
                EvaluatorOrganizationName = x.EvaluatorOrganizationName,
                CreatedBy = x.CreatedBy,
                Url = x.Url,
                Id = x.Id,
                KpiDetails = _dbContext.KPIDetails.Where(x => x.KPIId == x.Id).Select(y => new KPIDetailsGetDto
                {
                    Id = y.Id,
                    Title = y.Title,
                    MainGoal = y.MainGoal,
                    KPIDatas = _dbContext.KPIDatas.Where(x => x.KPIDetailId == y.Id).Select(z => new KPIDataGetDto
                    {
                        Id = z.Id,
                        Year = z.Year,
                        Data = z.Data,
                    }).ToList(),

                }).ToList(),

            }).FirstOrDefaultAsync();

            return kpis;
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
                if (kpiGet.ActiveYears.Count > 0)
                {
                    kpi.SetActiveYearsFromList(kpiGet.ActiveYears);
                }

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
    }
}
