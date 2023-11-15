using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
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
        public async Task<List<CaseReportDto>> GetCaseReport(string? startAt, string? endAt)
        {

            var allAffairs = _dbContext.Cases.Include(a => a.CaseType)
               .Include(a => a.CaseHistories).ToList();

            if (!string.IsNullOrEmpty(startAt))
            {
                string[] startDate = startAt.Split(new string[] { "/" }, StringSplitOptions.RemoveEmptyEntries);
                DateTime MDateTime = Convert.ToDateTime(XAPI.EthiopicDateTime.GetGregorianDate(Int32.Parse(startDate[1]), Int32.Parse(startDate[0]), Int32.Parse(startDate[2])));
                allAffairs = allAffairs.Where(x => x.CreatedAt >= MDateTime).ToList();
            }

            if (!string.IsNullOrEmpty(endAt))
            {

                string[] endDate = endAt.Split(new string[] { "/" }, StringSplitOptions.RemoveEmptyEntries);
                DateTime MDateTime = Convert.ToDateTime(XAPI.EthiopicDateTime.GetGregorianDate(Int32.Parse(endDate[1]), Int32.Parse(endDate[0]), Int32.Parse(endDate[2])));
                allAffairs = allAffairs.Where(x => x.CreatedAt <= MDateTime).ToList();
            }


            var report = new List<CaseReportDto>();
            foreach (var affair in allAffairs.ToList())
            {
                var eachReport = new CaseReportDto();
                eachReport.Id = affair.Id;
                eachReport.CaseType = affair.CaseType.CaseTypeTitle;
                eachReport.CaseNumber = affair.CaseNumber;
                eachReport.Subject = affair.LetterSubject;
                eachReport.IsArchived = affair.IsArchived.ToString();
                var firstOrDefault = affair.CaseHistories.OrderByDescending(x => x.CreatedAt)
                    .FirstOrDefault();
                if (firstOrDefault != null)
                    eachReport.OnStructure = _dbContext.OrganizationalStructures.Find(firstOrDefault
                            .ToStructureId).StructureName;
                var affairHistory = affair.CaseHistories.OrderByDescending(x => x.CreatedAt)
                    .FirstOrDefault();
                if (affairHistory != null)
                    eachReport.OnEmployee = _dbContext.Employees.Find(affairHistory
                            .ToEmployeeId).FullName;
                eachReport.CaseStatus = affair.AffairStatus.ToString();
                report.Add(eachReport);
                eachReport.CreatedDateTime = affair.CreatedAt;
                eachReport.CaseCounter = affair.CaseType.Counter;
                var change = DateTime.Now.Subtract(eachReport.CreatedDateTime).TotalHours;
                if (affair.AffairStatus == AffairStatus.Completed)
                {
                    var completedAt =
                        affair.CaseHistories
                            .FirstOrDefault(x => x.AffairHistoryStatus == AffairHistoryStatus.Completed).CompletedDateTime;
                    if (completedAt != null)
                    {
                        change = completedAt.Value.Subtract(eachReport.CreatedDateTime).TotalHours;
                    }
                }
                var d = change;
                d = Math.Round((Double)d, 2);
                eachReport.ElapsTime = d;

            }
            //if (affairStatus != null)
            //{
            //    report = affairStatus == AffairStatus.Completed ? report.OrderBy(x => x.ElapsTime).ToList() : report.OrderByDescending(x => x.ElapsTime).ToList();
            //}
            var AllReport = report.OrderByDescending(x => x.CreatedDateTime).ToList();
            return AllReport;



        }

        public async Task<CaseReportChartDto> GetCasePieChart(string? startAt, string? endAt)
        {
            var report = _dbContext.CaseTypes.ToList();
            var report2 = (from q in report
                           join
          b in _dbContext.Cases on q.Id equals b.CaseTypeId
                           select
                           new
                           {
                               q.CaseTypeTitle
                           }).Distinct();


            var Chart = new CaseReportChartDto();

            Chart.labels = new List<string>();
            Chart.datasets = new List<DataSets>();

            var datas = new DataSets();

            datas.data = new List<int>();
            datas.hoverBackgroundColor = new List<string>();
            datas.backgroundColor = new List<string>();



            foreach (var eachreport in report2)
            {



                var allAffairs = _dbContext.Cases.Where(x => x.CaseType.CaseTypeTitle == eachreport.CaseTypeTitle);
                var caseCount = allAffairs.Count();


                if (!string.IsNullOrEmpty(startAt))
                {
                    string[] startDate = startAt.Split(new string[] { "/" }, StringSplitOptions.RemoveEmptyEntries);
                    DateTime MDateTime = Convert.ToDateTime(XAPI.EthiopicDateTime.GetGregorianDate(Int32.Parse(startDate[1]), Int32.Parse(startDate[0]), Int32.Parse(startDate[2])));
                    allAffairs = allAffairs.Where(x => x.CreatedAt >= MDateTime);
                    caseCount = allAffairs.Count();


                }

                if (!string.IsNullOrEmpty(endAt))
                {

                    string[] endDate = endAt.Split(new string[] { "/" }, StringSplitOptions.RemoveEmptyEntries);
                    DateTime MDateTime = Convert.ToDateTime(XAPI.EthiopicDateTime.GetGregorianDate(Int32.Parse(endDate[1]), Int32.Parse(endDate[0]), Int32.Parse(endDate[2])));
                    allAffairs = allAffairs.Where(x => x.CreatedAt <= MDateTime);
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

        public async Task<CaseReportChartDto> GetCasePieCharByCaseStatus(string? startAt, string? endAt)
        {


            var allAffairs = _dbContext.Cases.Where(x => x.CaseNumber != null);





            var caseCount = allAffairs.Count();


            if (!string.IsNullOrEmpty(startAt))
            {
                string[] startDate = startAt.Split(new string[] { "/" }, StringSplitOptions.RemoveEmptyEntries);
                DateTime MDateTime = Convert.ToDateTime(XAPI.EthiopicDateTime.GetGregorianDate(Int32.Parse(startDate[1]), Int32.Parse(startDate[0]), Int32.Parse(startDate[2])));
                allAffairs = allAffairs.Where(x => x.CreatedAt >= MDateTime);
                caseCount = allAffairs.Count();


            }

            if (!string.IsNullOrEmpty(endAt))
            {

                string[] endDate = endAt.Split(new string[] { "/" }, StringSplitOptions.RemoveEmptyEntries);
                DateTime MDateTime = Convert.ToDateTime(XAPI.EthiopicDateTime.GetGregorianDate(Int32.Parse(endDate[1]), Int32.Parse(endDate[0]), Int32.Parse(endDate[2])));
                allAffairs = allAffairs.Where(x => x.CreatedAt <= MDateTime);
                caseCount = allAffairs.Count();

            }

            int assigned = allAffairs.Count(x => x.AffairStatus == AffairStatus.Assigned);
            int completed = allAffairs.Count(x => x.AffairStatus == AffairStatus.Completed);
            int encoded = allAffairs.Count(x => x.AffairStatus == AffairStatus.Encoded);
            int pend = allAffairs.Count(x => x.AffairStatus == AffairStatus.Pend);



            var Chart = new CaseReportChartDto();

            Chart.labels = new List<string>() { "Assigned", "completed", "Encoded", "Pend" };
            Chart.datasets = new List<DataSets>();

            var datas = new DataSets();

            datas.data = new List<int>() { assigned, completed, encoded, pend };
            datas.hoverBackgroundColor = new List<string>() { "#5591f5", "#2cb436", "#dfd02f", "#fe5e2b" };
            datas.backgroundColor = new List<string>() { "#5591f5", "#2cb436", "#dfd02f", "#fe5e2b" };

            Chart.datasets.Add(datas);

            return Chart;
        }


        public async Task<List<EmployeePerformance>> GetCaseEmployeePerformace(string key, string OrganizationName)
        {

            List<Employee> employees = new List<Employee>();
            List<CaseHistory> affairHistories = new List<CaseHistory>();
            EmployeePerformance eachPerformance = new EmployeePerformance();
            var empPerformance = new List<EmployeePerformance>();

            var employeeList = _dbContext.Employees.Include(x => x.OrganizationalStructure)                
                .ToList();

            if (!string.IsNullOrEmpty(OrganizationName))
            {
                employeeList = employeeList.Where(x => x.OrganizationalStructure.StructureName.Contains(OrganizationName)).ToList();
            }

            foreach (var employee in employeeList)
            {
                var AffairHistories = _dbContext.CaseHistories.Include(x => x.CaseType).Include(x => x.Case).Where(ah =>
                      ah.ToEmployeeId == employee.Id).ToList();
                var actualTimeTaken = 0.0;
                var expectedTime = 0.0;
                if (!string.IsNullOrEmpty(key))
                {
                    var affair = _dbContext.Cases.FirstOrDefault(x => x.CaseNumber.Contains(key));
                    if (affair != null)
                    {
                        AffairHistories = affair.CaseHistories.Where(ah =>
                        ah.ToEmployeeId == employee.Id).ToList();
                    }
                    else
                    {
                        AffairHistories = null;
                    }

                }
                if (AffairHistories != null)
                {
                    AffairHistories.ForEach(history =>
                    {
                        var dateDifference = 0.0;

                        if (history.AffairHistoryStatus == AffairHistoryStatus.Completed || history.AffairHistoryStatus == AffairHistoryStatus.Transfered)
                        {
                            dateDifference = history.CreatedAt.Subtract(history.TransferedDateTime ?? history.CompletedDateTime.Value).TotalHours;
                        }
                        if (history.AffairHistoryStatus == AffairHistoryStatus.Pend || history.AffairHistoryStatus == AffairHistoryStatus.Seen)
                        {
                            if (history.SeenDateTime != null)
                            {
                                dateDifference = history.SeenDateTime.Value.Subtract(history.CreatedAt).TotalHours;
                            }
                        }
                        actualTimeTaken += Math.Abs(dateDifference);
                        expectedTime += history.CaseType?.Counter ?? history.Case.CaseType.Counter;
                    });
                }



                if (employee != null)
                {
                    eachPerformance = new EmployeePerformance();
                    eachPerformance.Id = employee.Id;
                    eachPerformance.EmployeeName = employee.FullName;
                    eachPerformance.EmployeeStructure = employee.OrganizationalStructure.StructureName;
                    eachPerformance.Image = employee.Photo;
                    eachPerformance.ActualTimeTaken = Math.Round(actualTimeTaken, 2);
                    eachPerformance.ExpectedTime = Math.Round(expectedTime, 2);
                    if (expectedTime > actualTimeTaken)
                    {
                        eachPerformance.PerformanceStatus = PerformanceStatus.OverPlan.ToString();
                    }
                    else if (Math.Round(expectedTime, 2) == (Math.Round(actualTimeTaken, 2)))
                    {
                        eachPerformance.PerformanceStatus = PerformanceStatus.OnPlan.ToString();
                    }
                    else
                    {
                        eachPerformance.PerformanceStatus = PerformanceStatus.UnderPlan.ToString();
                    }

                    empPerformance.Add(eachPerformance);

                }
            }
            return empPerformance;
        }


        


        public async Task<List<SMSReportDto>> GetSMSReport(string? startAt, string? endAt)
        {
            var AffairMessages = _dbContext.CaseMessages.Include(x => x.Case.CaseType).Include(x => x.Case.Employee).Include(x => x.Case.Applicant).Select(y => new

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
                string[] startDate = startAt.Split(new string[] { "/" }, StringSplitOptions.RemoveEmptyEntries);
                DateTime MDateTime = Convert.ToDateTime(XAPI.EthiopicDateTime.GetGregorianDate(Int32.Parse(startDate[0]), Int32.Parse(startDate[1]), Int32.Parse(startDate[2])));
                AffairMessages = AffairMessages.Where(x => x.CreatedAt >= MDateTime).ToList();
            }

            if (!string.IsNullOrEmpty(endAt))
            {

                string[] endDate = endAt.Split(new string[] { "/" }, StringSplitOptions.RemoveEmptyEntries);
                DateTime MDateTime = Convert.ToDateTime(XAPI.EthiopicDateTime.GetGregorianDate(Int32.Parse(endDate[0]), Int32.Parse(endDate[1]), Int32.Parse(endDate[2])));
                AffairMessages = AffairMessages.Where(x => x.CreatedAt <= MDateTime).ToList();
            }

            return AffairMessages;
        }


        public async Task<List<CaseDetailReportDto>> GetCaseDetail(string key)
        {

            if (string.IsNullOrEmpty(key))
            {
                key = "";
            }

            var result = new List<CaseDetailReportDto>();
            var affairs = _dbContext.Cases.Where(x => x.Applicant.ApplicantName.Contains(key)
                                                 || x.CaseNumber.Contains(key)
                                                 || x.LetterNumber.Contains(key)
                                                 || x.Applicant.PhoneNumber.Contains(key))
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
                                        EmployeeStatus = ""


                                    }).OrderByDescending(x => x.CreatedDate).ToList()


                                }).FirstOrDefaultAsync();

            return result;


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
