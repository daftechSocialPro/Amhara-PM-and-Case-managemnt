using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.Case;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Models.CaseModel;
using PM_Case_Managemnt_API.Models.Common;
using System;
using System.Data;
using System.Drawing;
using System.Linq;
using static System.Runtime.InteropServices.JavaScript.JSType;
using String = System.String;

namespace PM_Case_Managemnt_API.Services.CaseMGMT
{
    public class CaserReportService : ICaseReportService
        {

            private readonly DBContext _dbContext;
            private Random rnd = new Random();
            public CaserReportService(DBContext dbContext)
            {
                _dbContext = dbContext;
            }
        public async Task<List<CaseReportDto>> GetCaseReport(Guid subOrgId, string? startAt, string? endAt)
        {
            try
            {
                DateTime? startDate = ParseEthiopicDate(startAt);
                DateTime? endDate = ParseEthiopicDate(endAt);

                IQueryable<Case> casesQuery = _dbContext.Cases
                    .Where(x => x.SubsidiaryOrganizationId == subOrgId)
                    .Include(x => x.CaseType)
                    .Include(x => x.CaseHistories)
                        .ThenInclude(x => x.ToStructure)
                    .Include(x => x.CaseHistories)
                        .ThenInclude(x => x.ToEmployee);

                if (startDate.HasValue)
                {
                    casesQuery = casesQuery.Where(x => x.CreatedAt >= startDate.Value);
                }

                if (endDate.HasValue)
                {
                    casesQuery = casesQuery.Where(x => x.CreatedAt <= endDate.Value);
                }

                var allAffairs = await casesQuery.ToListAsync();

                var report = allAffairs.Select(affair => new CaseReportDto
                {
                    Id = affair.Id,
                    CaseType = affair.CaseType.CaseTypeTitle,
                    CaseNumber = affair.CaseNumber,
                    Subject = affair.LetterSubject,
                    IsArchived = affair.IsArchived.ToString(),
                    OnStructure = affair.CaseHistories
                        .OrderByDescending(x => x.CreatedAt)
                        .FirstOrDefault()?.ToStructure?.StructureName ?? "Unknown",
                    OnEmployee = affair.CaseHistories
                        .OrderByDescending(x => x.CreatedAt)
                        .FirstOrDefault()?.ToEmployee?.FullName ?? "Unknown",
                    CaseStatus = affair.AffairStatus.ToString(),
                    CreatedDateTime = affair.CreatedAt,
                    CaseCounter = affair.CaseType.Counter,
                    ElapsTime = GetElapsedTime(affair)
                })
                .OrderByDescending(x => x.CreatedDateTime)
                .ToList();

                return report;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while fetching the case report for the subsidiary organization with ID {subOrgId}. Error details: {ex.Message}");
            }
        }

        //TODO: consdier moving the helper functions to utils or helper package
        private static DateTime? ParseEthiopicDate(string? dateStr)
        {
            if (string.IsNullOrEmpty(dateStr)) return null;

            try
            {
                var dateParts = dateStr.Split('/');
                return XAPI.EthiopicDateTime.GetGregorianDate(
                    int.Parse(dateParts[1]), 
                    int.Parse(dateParts[0]), 
                    int.Parse(dateParts[2])
                );
            }
            catch (Exception ex)
            {

                throw new Exception($"Invalid date format: {dateStr}. Error details: {ex.Message}");
            }
        }

        private static double GetElapsedTime(Case affair)
        {
            var createdAt = affair.CreatedAt;
            var completedHistory = affair.CaseHistories.FirstOrDefault(x => x.AffairHistoryStatus == AffairHistoryStatus.Completed);
            var completedAt = completedHistory?.CompletedDateTime;

            var elapsedTime = completedAt.HasValue
                ? completedAt.Value.Subtract(createdAt).TotalHours
                : DateTime.Now.Subtract(createdAt).TotalHours;

            return Math.Round(elapsedTime, 2);
        }



        public CaseReportChartDto GetCasePieChart(Guid subOrgId, string? startAt, string? endAt)
        {
            var report = _dbContext.CaseTypes.Where(x => x.SubsidiaryOrganizationId == subOrgId).ToList();
            var report2 = (from q in report
                           join b in _dbContext.Cases on q.Id equals b.CaseTypeId
                           where b.SubsidiaryOrganizationId == subOrgId  // Apply the constraint here
                           select new { q.CaseTypeTitle }).Distinct();

            DateTime? startDate = ParseEthiopicDate(startAt);
            DateTime? endDate = ParseEthiopicDate(endAt);

            var Chart = new CaseReportChartDto
            {
                labels = new List<string>(),
                datasets = new List<DataSets>()
            };

            var datas = new DataSets
            {
                data = new List<int>(),
                hoverBackgroundColor = new List<string>(),
                backgroundColor = new List<string>()
            };

            foreach (var eachreport in report2)
            {

                var allAffairs = _dbContext.Cases.Where(x => x.CaseType.CaseTypeTitle == eachreport.CaseTypeTitle);
                var caseCount = allAffairs.Count();

                if (!string.IsNullOrEmpty(startAt))
                {
                    allAffairs = allAffairs.Where(x => x.CreatedAt >= startDate);
                    caseCount = allAffairs.Count();

                }

                if (!string.IsNullOrEmpty(endAt))
                {

                    allAffairs = allAffairs.Where(x => x.CreatedAt <= endDate);
                    caseCount = allAffairs.Count();
                }

                Chart.labels.Add(eachreport.CaseTypeTitle);

                datas.data.Add(caseCount);
                string randomColor = String.Format("#{0:X6}", rnd.Next(0x1000000));
                datas.backgroundColor.Add(randomColor);
                datas.hoverBackgroundColor.Add(randomColor);

                Chart.datasets.Add(datas);

            }

            return Chart;
        }

        public async Task<CaseReportChartDto> GetCasePieCharByCaseStatus(Guid subOrgId, string? startAt, string? endAt)
    
    {
        DateTime? startDate = null;
        DateTime? endDate = null;

        if (!string.IsNullOrEmpty(startAt))
        {
            startDate = ParseEthiopicDate(startAt);
        }

        if (!string.IsNullOrEmpty(endAt))
        {
            endDate = ParseEthiopicDate(endAt);
        }

        var allAffairsQuery = _dbContext.Cases.Where(x => x.CaseNumber != null && x.SubsidiaryOrganizationId == subOrgId);

        if (startDate.HasValue)
        {
            allAffairsQuery = allAffairsQuery.Where(x => x.CreatedAt >= startDate.Value);
        }

        if (endDate.HasValue)
        {
            allAffairsQuery = allAffairsQuery.Where(x => x.CreatedAt <= endDate.Value);
        }

        var allAffairs = await allAffairsQuery.ToListAsync();

        var caseCount = allAffairs.Count;

        int assigned = allAffairs.Count(x => x.AffairStatus == AffairStatus.Assigned);
        int completed = allAffairs.Count(x => x.AffairStatus == AffairStatus.Completed);
        int encoded = allAffairs.Count(x => x.AffairStatus == AffairStatus.Encoded);
        int pend = allAffairs.Count(x => x.AffairStatus == AffairStatus.Pend);

        var chart = new CaseReportChartDto
        {
            labels = new List<string> { "Assigned", "Completed", "Encoded", "Pend" },
            datasets = new List<DataSets>
            {
                new() {
                    data = new List<int> { assigned, completed, encoded, pend },
                    hoverBackgroundColor = new List<string> { "#5591f5", "#2cb436", "#dfd02f", "#fe5e2b" },
                    backgroundColor = new List<string> { "#5591f5", "#2cb436", "#dfd02f", "#fe5e2b" }
                }
            }
        };

        return chart;
    }

    public async Task<List<EmployeePerformance>> GetCaseEmployeePerformace(Guid subOrgId, string key, string OrganizationName)
        {
            try
            {
                var empPerformance = new List<EmployeePerformance>();

                var employeeList = _dbContext.Employees
                    .Where(x => x.OrganizationalStructure.SubsidiaryOrganizationId == subOrgId)
                    .Include(x => x.OrganizationalStructure)
                    .ToList();

                if (!string.IsNullOrEmpty(OrganizationName))
                {
                    employeeList = employeeList.Where(x => x.OrganizationalStructure.StructureName.Contains(OrganizationName)).ToList();
                }

                foreach (var employee in employeeList)
                {
                    var actualTimeTaken = 0.0;
                    var expectedTime = 0.0;

                    var caseHistoriesQuery = _dbContext.CaseHistories
                        .Include(x => x.CaseType)
                        .Include(x => x.Case.CaseType)
                        .Where(ah => ah.ToEmployeeId == employee.Id);

                    if (!string.IsNullOrEmpty(key))
                    {
                        var affair = await _dbContext.Cases.FirstOrDefaultAsync(x => x.CaseNumber.Contains(key));
                        if (affair != null)
                        {
                            caseHistoriesQuery = affair.CaseHistories.Where(ah => ah.ToEmployeeId == employee.Id).AsQueryable();
                        }
                    }

                    var affairHistories = await caseHistoriesQuery.ToListAsync();

                    affairHistories.ForEach(history =>
                    {
                        var dateDifference = 0.0;

                        if (history.AffairHistoryStatus == AffairHistoryStatus.Completed || history.AffairHistoryStatus == AffairHistoryStatus.Transfered)
                        {
                            dateDifference = history.CreatedAt.Subtract(history.TransferedDateTime ?? history.CompletedDateTime.Value).TotalHours;
                        }
                        else if (history.AffairHistoryStatus == AffairHistoryStatus.Pend || history.AffairHistoryStatus == AffairHistoryStatus.Seen)
                        {
                            if (history.SeenDateTime != null)
                            {
                                dateDifference = history.SeenDateTime.Value.Subtract(history.CreatedAt).TotalHours;
                            }
                        }

                        actualTimeTaken += Math.Abs(dateDifference);
                        expectedTime += history.CaseType?.Counter ?? history.Case.CaseType.Counter;
                    });

                    var eachPerformance = new EmployeePerformance
                    {
                        Id = employee.Id,
                        EmployeeName = employee.FullName,
                        EmployeeStructure = employee.OrganizationalStructure.StructureName,
                        Image = employee.Photo,
                        ActualTimeTaken = Math.Round(actualTimeTaken, 2),
                        ExpectedTime = Math.Round(expectedTime, 2),
                        PerformanceStatus = GetPerformanceStatus(expectedTime, actualTimeTaken)
                    };

                    empPerformance.Add(eachPerformance);
                }

                return empPerformance;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while fetching employee performance data for the subsidiary organization with ID {subOrgId}. Error details: {ex.Message}");
            }
        }

        private static string GetPerformanceStatus(double expectedTime, double actualTimeTaken)
        {
            if (expectedTime > actualTimeTaken)
            {
                return PerformanceStatus.OverPlan.ToString();
            }
            else if (Math.Round(expectedTime, 2) == Math.Round(actualTimeTaken, 2))
            {
                return PerformanceStatus.OnPlan.ToString();
            }
            else
            {
                return PerformanceStatus.UnderPlan.ToString();
            }
        }

        public async Task<List<SMSReportDto>> GetSMSReport(Guid subOrgId, string? startAt, string? endAt)
        {
            var AffairMessages = _dbContext.CaseMessages.Where(x => x.Case.SubsidiaryOrganizationId == subOrgId).Include(x => x.Case.CaseType).Include(x => x.Case.Employee).Include(x => x.Case.Applicant).Select(y => new


            SMSReportDto
            {
                CaseNumber = y.Case.CaseNumber,
                ApplicantName = y.Case.Applicant.ApplicantName + y.Case.Employee.FullName,
                LetterNumber = y.Case.LetterNumber,
                Subject = y.Case.LetterSubject,
                CaseTypeTitle = y.Case.CaseType.CaseTypeTitle,
                PhoneNumber = y.Case.Applicant.PhoneNumber + y.Case.Employee.PhoneNumber,
                PhoneNumber2 = y.Case.PhoneNumber2,
                Message = y.MessageBody,
                MessageGroup = y.MessageFrom.ToString(),
                IsSMSSent = y.Messagestatus,
                CreatedAt = y.CreatedAt
            }

            ).ToList();
            if (!string.IsNullOrEmpty(startAt))
            {
                var startDate = ParseEthiopicDate(startAt);
            }

            if (!string.IsNullOrEmpty(endAt))
            {
                var endDate = ParseEthiopicDate(endAt);
            }

            return AffairMessages;
        }


        public async Task<List<CaseDetailReportDto>> GetCaseDetail(Guid subOrgId, string key)
        {

            if (string.IsNullOrEmpty(key))
            {
                key = "";
            }

            var result = new List<CaseDetailReportDto>();
            var affairs = _dbContext.Cases.Where(x => x.SubsidiaryOrganizationId == subOrgId && (x.Applicant.ApplicantName.Contains(key)
                                                 || x.CaseNumber.Contains(key)
                                                 || x.LetterNumber.Contains(key)
                                                 || x.Applicant.PhoneNumber.Contains(key)))
                                                 .Include(a => a.Applicant)
                                                 .Include(a => a.Employee)
                                                 .Include(a => a.CaseType)
                                                 .Select(y => new CaseDetailReportDto
                                                 {
                                                     Id = y.Id,
                                                     CaseNumber = y.CaseNumber,
                                                     ApplicantName = y.Applicant.ApplicantName + y.Employee.FullName,
                                                     LetterNumber = y.LetterNumber,
                                                     Subject = y.LetterSubject,
                                                     PhoneNumber = y.PhoneNumber2 + "/" + y.Applicant.PhoneNumber + y.Employee.PhoneNumber,
                                                     CaseTypeTitle = y.CaseType.CaseTypeTitle,
                                                     CaseCounter = y.CaseType.Counter,
                                                     CaseTypeStatus = y.AffairStatus.ToString(),
                                                     Createdat = y.CreatedAt.ToString()

                                                 })
                                                 .ToList();

            affairs.OrderByDescending(x => x.CaseNumber).ToList().ForEach(af =>
            {
                var afano = af.CaseNumber;
            });



            var result2 = affairs.OrderByDescending(x => x.CaseNumber).ToList();

            return result2;
        }


        public async Task<CaseProgressReportDto> GetCaseProgress(Guid caseId)
        {

            var cases = _dbContext.Cases.Include(x => x.CaseType).Include(x => x.Employee).Include(x => x.Applicant).Where(x => x.Id == caseId);
            var casetype = _dbContext.CaseTypes.Where(x => x.ParentCaseTypeId == cases.FirstOrDefault().CaseTypeId).ToList();
            var result = await (from c in cases
                                select new CaseProgressReportDto
                                {
                                    CaseNumber = c.CaseNumber,
                                    CaseTypeTitle = c.CaseType.CaseTypeTitle,
                                    ApplicationDate = c.CreatedAt.ToString(),
                                    ApplicantName = c.Applicant.ApplicantName + c.Employee.FullName,
                                    LetterNumber = c.LetterNumber,
                                    LetterSubject = c.LetterSubject,
                                    HistoryProgress = _dbContext.CaseHistories.Include(x => x.FromEmployee).Include(x => x.ToEmployee).Where(x => x.CaseId == caseId).Select(y => new CaseProgressReportHistoryDto
                                    {
                                        FromEmployee = y.FromEmployee.FullName,
                                        ToEmployee = y.ToEmployee.FullName,
                                        CreatedDate = y.CreatedAt.ToString(),
                                        Seenat = y.SeenDateTime.ToString(),
                                        StatusDateTime = y.AffairHistoryStatus.ToString() + " ( " + y.ReciverType + " )",
                                        ShouldTake = y.AffairHistoryStatus == AffairHistoryStatus.Seen ? y.SeenDateTime.ToString() :
                                                     y.AffairHistoryStatus == AffairHistoryStatus.Transfered ? y.TransferedDateTime.ToString() :
                                                     y.AffairHistoryStatus == AffairHistoryStatus.Completed ? y.CompletedDateTime.ToString() :
                                                     y.AffairHistoryStatus == AffairHistoryStatus.Revert ? y.RevertedAt.ToString() : "",
                                        ElapsedTime = getElapsedTime(y.CreatedAt,

                                         y.AffairHistoryStatus == AffairHistoryStatus.Seen ? y.SeenDateTime :
                                                     y.AffairHistoryStatus == AffairHistoryStatus.Transfered ? y.TransferedDateTime :
                                                     y.AffairHistoryStatus == AffairHistoryStatus.Completed ? y.CompletedDateTime :
                                                     y.AffairHistoryStatus == AffairHistoryStatus.Revert ? y.RevertedAt : DateTime.Now
                                        ),
                                        ElapseTimeBasedOnSeenTime = getElapsedTime(y.SeenDateTime,

                                         y.AffairHistoryStatus == AffairHistoryStatus.Seen ? y.SeenDateTime :
                                                     y.AffairHistoryStatus == AffairHistoryStatus.Transfered ? y.TransferedDateTime :
                                                     y.AffairHistoryStatus == AffairHistoryStatus.Completed ? y.CompletedDateTime :
                                                     y.AffairHistoryStatus == AffairHistoryStatus.Revert ? y.RevertedAt : DateTime.Now
                                        ),
                                        EmployeeStatus = GetEmployeeStatus(y, casetype)


                                    }).OrderByDescending(x => x.CreatedDate).ToList()


                                }).FirstOrDefaultAsync();

            return result;


        }


        public async Task<List<CaseType>> GetChildCaseTypes(Guid caseId)
        {
            var casse = await _dbContext.Cases.Where(x => x.Id == caseId).Select(x => x.CaseTypeId).FirstOrDefaultAsync();
            var caseTypes = await _dbContext.CaseTypes.Where(x => x.ParentCaseTypeId == casse).OrderBy(x => x.OrderNumber).ToListAsync();


            return caseTypes;



        }


        static private string GetEmployeeStatus(CaseHistory history, List<CaseType> caseTypes)
        {

            var caseHistoryDuratio = getElapsedTime(history.SeenDateTime,

                                        history.AffairHistoryStatus == AffairHistoryStatus.Seen ? history.SeenDateTime :
                                                    history.AffairHistoryStatus == AffairHistoryStatus.Transfered ? history.TransferedDateTime :
                                                    history.AffairHistoryStatus == AffairHistoryStatus.Completed ? history.CompletedDateTime :
                                                    history.AffairHistoryStatus == AffairHistoryStatus.Revert ? history.RevertedAt : DateTime.Now
                                       );



            var caseHistoryDuration = caseHistoryDuratio != "" && caseHistoryDuratio != null ? double.Parse(caseHistoryDuratio.Split(" ")[0]) : 0;


            if (caseHistoryDuratio != "" && caseHistoryDuratio != null)
            {
                caseHistoryDuration = caseHistoryDuratio.Split(" ")[1] != "Hr." ? Math.Round(caseHistoryDuration / 60, 2) : caseHistoryDuration;

            }



            var caseTypeDuration = 0.0;
            var casetype = caseTypes.Where(x => x.OrderNumber == history.ChildOrder + 1).FirstOrDefault();

            if (casetype != null)
            {


                if (casetype.MeasurementUnit == TimeMeasurement.Minutes)
                {
                    caseTypeDuration = casetype.Counter / 60;
                }

                else if (casetype.MeasurementUnit == TimeMeasurement.Day)
                {
                    caseTypeDuration = casetype.Counter * 24;
                }
                else
                {
                    caseTypeDuration = casetype.Counter;
                }

            }



            if (caseTypeDuration == 0)
            {
                return "Case Child has No Duration";
            }

            else
            if (caseHistoryDuration > caseTypeDuration)
            {
                return $"Under Plan ({Math.Round(caseTypeDuration, 2)} Hr)";
            }
            else if (caseHistoryDuration < caseTypeDuration)
            {
                return $"Over Plan ({Math.Round(caseTypeDuration, 2)} Hr)";
            }
            else
            {
                return $"On Plan ({Math.Round(caseTypeDuration, 2)} Hr)";
            }
        }



        //static  public string getElapsedTIme(int childOrder,List<CaseType> affairTypes)
        //  {



        //      var co = (float)0;

        //      foreach (var childaffair in affairTypes)
        //      {
        //          int childcount = childOrder;

        //          if (childaffair.OrderNumber == childcount+1)
        //          {
        //              var c = childaffair.Counter;
        //              co = childaffair.Counter;
        //              if (c >= 60)
        //              {
        //                  c = c / 60;
        //                  return c.ToString() + "Hr.";
        //              }
        //              else
        //              {
        //                  return c.ToString() + "min";
        //              }

        //          }
        //      }
        //      return "";
        //  }

        static public string getElapsedTime(DateTime? historyCreatedTime, DateTime? ActionTake)
        {
            if (historyCreatedTime.HasValue)
            {
                int hourDifference = 0;

                TimeSpan? timeDifference = ActionTake - historyCreatedTime;

                hourDifference = (int)timeDifference?.TotalMinutes;

                if (hourDifference > 60)
                {
                    double hours = (double)hourDifference / 60;

                    return hours.ToString("F2") + " Hr.";

                }
                else
                {
                    return hourDifference + " Min.";
                }
            }
            else
            {
                return "";
            }


           

        }





    }
}
