using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.DTOS.KPI;
using PM_Case_Managemnt_API.Helpers;
using PM_Case_Managemnt_API.Models.KPI;
using PM_Case_Managemnt_API.Models.PM;

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
                    string? subOrg = await _dbContext.SubsidiaryOrganizations.Where(x => x.Id == kpiPost.SubsidiaryOrganizationId).Select(x => x.OrganizationNameEnglish).FirstOrDefaultAsync();
                    kpi.EncoderOrganizationName = subOrg;
                    kpi.EvaluatorOrganizationName = kpiPost.EvaluatorOrganizationName;
                    kpi.HasSubsidiaryOrganization = kpiPost.HasSubsidiaryOrganization;
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


        public async Task<List<SelectListDto>> GetKpiGoalSelectList(Guid subOrgId)
        {
            List<SelectListDto> kpiGoal = await _dbContext.KPIDetails.Where(x => x.KPI.SubsidiaryOrganizationId == subOrgId).Select(x => new SelectListDto
            {

                Name = x.MainGoal,
                Id = x.Id
            }).ToListAsync();

            return kpiGoal;
        }

        public async Task<ResponseMessage> AddKpiGoal(KPIGoalPostDto kpiGoalPost)
        {
            try
            {
                bool Kpi = await _dbContext.KPIs.AnyAsync(x => x.Id == kpiGoalPost.KPIId);

                if (!Kpi)
                {
                    return new ResponseMessage { Success = false, Message = "KPI Not Found" };
                }

                KPIDetails kpiGoal = new KPIDetails
                {
                    Id = Guid.NewGuid(),
                    CreatedAt = DateTime.Now,
                    CreatedBy = kpiGoalPost.CreatedBy,
                    KPIId = kpiGoalPost.KPIId,
                    MainGoal = kpiGoalPost.Goal,

                };

                await _dbContext.KPIDetails.AddAsync(kpiGoal);
                await _dbContext.SaveChangesAsync();

                return new ResponseMessage
                {
                    Success = true,
                    Message = "KPI Goal Added Successfully"
                };


            }
            catch (Exception ex)
            {
                return new ResponseMessage { Success = false, Message = ex.Message };
            }
        }

        public async Task<KPIDetailsPostDto> GetKpiDetailForEdit(Guid goalId)
        {
            var kpiDetail = await _dbContext.KPIDetails.Where(x => x.GoalId == goalId).Select(x => new KPIDetailsPostDto
            {
                KPIId = x.KPIId,
                Goal = x.MainGoal,
                GoalId = x.GoalId,

            }).FirstOrDefaultAsync();

            return kpiDetail;
        }

        public async Task<ResponseMessage> AddKPIDetail(KPIDetailsPostDto kpiDetailsPost)
        {
            try
            {
                bool Kpi = await _dbContext.KPIs.AnyAsync(x => x.Id == kpiDetailsPost.KPIId);

                if (!Kpi)
                {
                    return new ResponseMessage { Success = false, Message = "KPI Not Found" };
                }

                List<KPIDetails> kpiDetails = new List<KPIDetails>();

                Guid goalId = Guid.NewGuid();
                if (kpiDetailsPost.GoalId != Guid.Empty || kpiDetailsPost.GoalId != null)
                {
                    goalId = (Guid)kpiDetailsPost.GoalId;
                }
                foreach (SimilarGoals k in kpiDetailsPost.Titles)
                {
                    kpiDetails.Add(new KPIDetails
                    {
                        Id = Guid.NewGuid(),
                        CreatedAt = DateTime.Now,
                        CreatedBy = kpiDetailsPost.CreatedBy,
                        KPIId = kpiDetailsPost.KPIId,
                        MainGoal = kpiDetailsPost.Goal,
                        Title = k.Title,
                        StartYearProgress = k.StartYearProgress,
                        GoalId = goalId
                    });
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

                KPIDetails? KpiDetail = await _dbContext.KPIDetails.FindAsync(kpiDataPost.KPIDetailId);

                if (KpiDetail == null)
                {
                    return new ResponseMessage { Success = false, Message = "KPI Detail Not Found" };
                }



                KPIData kpiData = new KPIData
                {
                    Id = Guid.NewGuid(),
                    CreatedAt = DateTime.Now,
                    CreatedBy = kpiDataPost.CreatedBy,
                    Year = kpiDataPost.Year,
                    Data = kpiDataPost.Data,
                    KPIDetailId = kpiDataPost.KPIDetailId
                };





                await _dbContext.KPIDatas.AddAsync(kpiData);
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
            List<KPIGetDto> kpis = await _dbContext.KPIs.Select(x => new KPIGetDto
            {
                Title = x.Title,
                StartYear = x.StartYear,
                ActiveYearsString = x.ActiveYearsString,
                EncoderOrganizationName = x.EncoderOrganizationName,
                EvaluatorOrganizationName = x.EvaluatorOrganizationName,
                CreatedBy = x.CreatedBy,
                AccessCode = x.AccessCode,
                HasSubsidiaryOrganization = x.HasSubsidiaryOrganization,
                SubsidiaryOrganizationId = x.SubsidiaryOrganizationId,
                Id = x.Id

            }).ToListAsync();


            return kpis;
        }

        public async Task<KPIGetDto> GetKPIById(Guid id)
        {
            KPIGetDto? kpis = await _dbContext.KPIs
                        .Where(x => x.Id == id || x.SubsidiaryOrganizationId == id)
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

                        })
                        .FirstOrDefaultAsync();

            if (kpis == null)
            {
                return new KPIGetDto();
            }

            kpis.ActiveYears = kpis.ActiveYearsString?.Split(',').Select(int.Parse).ToList() ?? new List<int>();


            if (kpis.HasSubsidiaryOrganization)
            {


                kpis.KpiDetails = await _dbContext.Activities
                                                .Join(_dbContext.KPIDetails.Where(d => d.KPIId == kpis.Id),
                                                      activity => activity.KpiGoalId,
                                                      kpiDetail => kpiDetail.Id,
                                                      (activity, kpiDetail) => new { activity, kpiDetail.MainGoal })
                                                .GroupBy(x => x.activity.KpiGoalId)
                                                .Select(g => new GroupedKPIDetailsGetDto
                                                {
                                                    MainGoal = g.First().activity.KpiGoal.MainGoal,
                                                    Details = g.Select(x => new KPIDetailsGetDto
                                                    {
                                                        Id = x.activity.Id,
                                                        Title = x.activity.ActivityDescription,
                                                        StartYearProgress = x.activity.Begining,
                                                        MainGoal = x.activity.KpiGoal.MainGoal,
                                                        KPIDatas = new List<KPIDataGetDto>
                                                                {
                                                                    new KPIDataGetDto
                                                                    {
                                                                        Id = x.activity.Id,
                                                                        GergorianDate = x.activity.ShouldEnd,
                                                                        Data = (_dbContext.ActivityProgresses
                                                                            .Where(z => z.ActivityId == x.activity.Id
                                                                                && (z.IsApprovedByDirector == approvalStatus.approved
                                                                                    || (z.IsApprovedByFinance == approvalStatus.approved || z.Activity.Task.Plan.ProjectType == ProjectType.Regular)
                                                                                    || z.IsApprovedByManager == approvalStatus.approved))
                                                                            .Sum(z => z.ActualWorked)).ToString()
                                                                    }
                                                                }
                                                    }).ToList()

                                                })
                                                .ToListAsync();
                kpis.KpiDetails.ForEach(x => x.Details.ForEach(y => y.KPIDatas.ForEach(z => z.Year = int.Parse(XAPI.EthiopicDateTime.GetEthiopicDate(z.GergorianDate.Day, z.GergorianDate.Month, z.GergorianDate.Year).Split('/')[2]))));

            }
            else
            {


                kpis.KpiDetails = _dbContext.KPIDetails
                                .Where(d => d.KPIId == kpis.Id)
                                .GroupBy(d => d.GoalId)
                                .Select(group => new GroupedKPIDetailsGetDto
                                {
                                    MainGoal = group.First().MainGoal,
                                    MainGoalId = (Guid)group.Key,
                                    Details = group.Select(d => new KPIDetailsGetDto
                                    {
                                        Id = d.Id,
                                        Title = d.Title,
                                        MainGoal = d.MainGoal,
                                        StartYearProgress = d.StartYearProgress,
                                        KPIDatas = _dbContext.KPIDatas
                                            .Where(z => z.KPIDetailId == d.Id)
                                            .Select(z => new KPIDataGetDto
                                            {
                                                Id = z.Id,
                                                Year = z.Year,
                                                Data = z.Data,
                                            }).ToList()
                                    }).ToList()
                                }).ToList();
            }

            return kpis;
        }

        public async Task<List<KPIGetSeventy>> GetKpiSeventyById(Guid id, string? date)
        {
            int year;
            if (!string.IsNullOrEmpty(date))
            {
                string[] endDate = date.Split(new string[] { "/" }, StringSplitOptions.RemoveEmptyEntries);
                DateTime ShouldEnd = Convert.ToDateTime(XAPI.EthiopicDateTime.GetGregorianDate(Int32.Parse(endDate[1]), Int32.Parse(endDate[0]), Int32.Parse(endDate[2])));
                year = ShouldEnd.Year;
            }
            else
            {
                year = DateTime.Now.Year;
            }

            var kpiGetSeventyList = await _dbContext.Plans.Where(x => x.Program.SubsidiaryOrganizationId == id && x.BudgetYear.ToDate.Year == year).Select(
                x => new KPIGetSeventy
                {
                    PlanId = x.Id,
                    PlanTitle = x.PlanName,
                    PlanWeight = x.PlanWeight,
                    KPITask = _dbContext.Tasks.Where(t => t.PlanId == x.Id).Select(t => new KPITask
                    {
                        TaskId = t.Id,
                        TaskTitle = t.TaskDescription,
                        KPIActivity = _dbContext.Activities.Where(a => a.TaskId == t.Id).Select(a => new KPIActivity
                        {
                            ActivityId = a.Id,
                            ActivityTitle = a.ActivityDescription,
                            ActivityWeight = a.Weight,
                            Goal = a.Goal,
                            Measurment = a.UnitOfMeasurement.LocalName,
                            Actual = _dbContext.ActivityProgresses.Where(ap => ap.ActivityId == a.Id && ap.IsApprovedByDirector == approvalStatus.approved && (ap.IsApprovedByFinance == approvalStatus.approved || x.ProjectType == ProjectType.Regular) && ap.IsApprovedByManager == approvalStatus.approved).Sum(ap => ap.ActualWorked)
                        }).ToList()
                    }).ToList()

                }).ToListAsync();


            foreach (var kpiGetSeventy in kpiGetSeventyList)
            {
                float totalPlanResult = 0;
                float totalPlanWeight = 0;

                foreach (var task in kpiGetSeventy.KPITask)
                {
                    float totalTaskResult = 0;
                    float totalTaskWeight = 0;

                    foreach (var activity in task.KPIActivity)
                    {
                        if (activity.Goal > 0)
                        {
                            activity.Percentage = (activity.Actual / activity.Goal) * 100;
                        }
                        else
                        {
                            activity.Percentage = 0;
                        }

                        activity.ActivityResult = (activity.Percentage * activity.ActivityWeight) / 100;

                        totalTaskResult += activity.ActivityResult;
                        totalTaskWeight += activity.ActivityWeight;
                    }

                    task.TaskResult = totalTaskResult;
                    task.TaskWeight = totalTaskWeight;

                    totalPlanResult += task.TaskResult;
                    totalPlanWeight += task.TaskWeight;
                }

                kpiGetSeventy.PlanResult = totalPlanResult;
                kpiGetSeventy.PlanWeight = totalPlanWeight;
            }

            return kpiGetSeventyList;
        }

        public async Task<ResponseMessage> UpdateKPI(KPIGetDto kpiGet)
        {
            try
            {
                KPIList? kpi = await _dbContext.KPIs.FindAsync(kpiGet.Id);

                if (kpi == null)
                {
                    return new ResponseMessage { Success = false, Message = "KPI Not Found" };
                }
                kpi.StartYear = kpiGet.StartYear;
                kpi.Title = kpiGet.Title;
                if (!kpiGet.HasSubsidiaryOrganization)
                {

                    string output = string.Concat(kpiGet.EncoderOrganizationName.Split(' ')
                                              .Where(w => !string.IsNullOrWhiteSpace(w))
                                              .Select(w => char.ToUpper(w[0])));
                    string uniqueIdentifier = Guid.NewGuid().ToString("N").Substring(0, 5);


                    kpi.AccessCode = $"{output}-{uniqueIdentifier}";
                    kpi.EncoderOrganizationName = kpiGet.EncoderOrganizationName;
                    kpi.EvaluatorOrganizationName = kpiGet.EvaluatorOrganizationName;

                }
                else
                {
                    string? subOrg = await _dbContext.SubsidiaryOrganizations.Where(x => x.Id == kpiGet.SubsidiaryOrganizationId).Select(x => x.OrganizationNameEnglish).FirstOrDefaultAsync();
                    kpi.EncoderOrganizationName = subOrg;
                    kpi.EvaluatorOrganizationName = kpiGet.EvaluatorOrganizationName;
                    kpi.HasSubsidiaryOrganization = kpiGet.HasSubsidiaryOrganization;
                    kpi.SubsidiaryOrganizationId = kpiGet.SubsidiaryOrganizationId;
                }
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

        public async Task<ResponseMessage> DeleteKPI(Guid kpiId)
        {
            try
            {
                KPIList? kpi = await _dbContext.KPIs.FindAsync(kpiId);

                if (kpi == null)
                {
                    return new ResponseMessage
                    {
                        Success = false,
                        Message = "KPI Not Found!!!"
                    };
                }

                List<KPIDetails> kpiDetails = await _dbContext.KPIDetails.Where(x => x.KPIId == kpi.Id).ToListAsync();

                if (kpiDetails != null)
                {
                    foreach (KPIDetails? detail in kpiDetails)
                    {
                        List<KPIData> kpiData = await _dbContext.KPIDatas.Where(x => x.KPIDetailId == detail.Id).ToListAsync();
                        if (kpiData != null)
                        {
                            _dbContext.KPIDatas.RemoveRange(kpiData);
                        }
                    }

                    _dbContext.KPIDetails.RemoveRange(kpiDetails);
                }

                _dbContext.KPIs.Remove(kpi);

                await _dbContext.SaveChangesAsync();
                return new ResponseMessage
                {
                    Success = true,
                    Message = "KPI Deleted Successfully!!!"
                };
            }
            catch (Exception ex)
            {
                return new ResponseMessage
                {
                    Success = true,
                    Message = ex.Message
                };
            }
        }

        public async Task<ResponseMessage> UpdateKPIDetail(KPIDetailsGetDto kpiDetailsGet)
        {
            try
            {
                KPIDetails? kpiDetail = await _dbContext.KPIDetails.FindAsync(kpiDetailsGet.Id);

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

        public async Task<ResponseMessage> DeleteKPIDetail(Guid kpiDetailId)
        {
            try
            {
                KPIDetails? kpiDetail = await _dbContext.KPIDetails.FindAsync(kpiDetailId);

                if (kpiDetail == null)
                {
                    return new ResponseMessage
                    {
                        Success = false,
                        Message = "KPI Detail Not Found!!!"
                    };
                }


                List<KPIData> kpiData = await _dbContext.KPIDatas.Where(x => x.KPIDetailId == kpiDetail.Id).ToListAsync();

                if (kpiData != null)
                {
                    _dbContext.KPIDatas.RemoveRange(kpiData);
                }


                _dbContext.KPIDetails.Remove(kpiDetail);


                await _dbContext.SaveChangesAsync();

                return new ResponseMessage
                {
                    Success = true,
                    Message = "KPI Detail Deleted Successfully!!!"
                };
            }
            catch (Exception ex)
            {
                return new ResponseMessage
                {
                    Success = true,
                    Message = ex.Message
                };
            }
        }

        public async Task<ResponseMessage> LoginKpiDataEncoding(string accessCode)
        {

            Guid kpiId = await _dbContext.KPIs.AsNoTracking().Where(x => x.AccessCode == accessCode).Select(x => x.Id).FirstOrDefaultAsync();

            if (kpiId == null)
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
