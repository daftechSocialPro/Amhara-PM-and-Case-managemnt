using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.CaseDto;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Helpers;
using PM_Case_Managemnt_API.Hubs;
using PM_Case_Managemnt_API.Models.CaseModel;
using PM_Case_Managemnt_API.Models.Common;
using PM_Case_Managemnt_API.Services.CaseMGMT.CaseForwardService;
using PM_Case_Managemnt_API.Services.CaseMGMT.History;
using System.Runtime.CompilerServices;

namespace PM_Case_Managemnt_API.Services.CaseService.Encode
{
    public class CaseEncodeService : ICaseEncodeService
    {
        private readonly DBContext _dbContext;

        public CaseEncodeService(DBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<string> Add(CaseEncodePostDto caseEncodePostDto)
        {
            try
            {
                if (caseEncodePostDto.EmployeeId == null && caseEncodePostDto.ApplicantId == null)
                    throw new Exception("Please Provide an Applicant ID or Employee ID");


                Case newCase = new()
                {
                    Id = Guid.NewGuid(),
                    CreatedAt = DateTime.Now,
                    RowStatus = Models.Common.RowStatus.Active,
                    CreatedBy = caseEncodePostDto.CreatedBy,
                    ApplicantId = caseEncodePostDto.ApplicantId,
                    //EmployeeId = caseEncodePostDto.EmployeeId,
                    LetterNumber = caseEncodePostDto.LetterNumber,
                    LetterSubject = caseEncodePostDto.LetterSubject,
                    CaseTypeId = caseEncodePostDto.CaseTypeId,
                    AffairStatus = AffairStatus.Encoded,
                    PhoneNumber2 = caseEncodePostDto.PhoneNumber2,
                    Representative = caseEncodePostDto.Representative,

                };
                string caseNumber = await GetCaseNumber();
                newCase.CaseNumber = caseNumber;

                await _dbContext.AddAsync(newCase);
                await _dbContext.SaveChangesAsync();



                return newCase.Id.ToString();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> Update(CaseEncodePostDto caseEncodePostDto)
        {
            try
            {
                if (caseEncodePostDto.EmployeeId == null && caseEncodePostDto.ApplicantId == null)
                    throw new Exception("Please Provide an Applicant ID or Employee ID");

                var case1 = _dbContext.Cases.Find(caseEncodePostDto.caseID);



                case1.ApplicantId = caseEncodePostDto.ApplicantId;
                //EmployeeId = caseEncodePostDto.EmployeeId,
                case1.LetterNumber = caseEncodePostDto.LetterNumber;
                case1.LetterSubject = caseEncodePostDto.LetterSubject;
                case1.CaseTypeId = caseEncodePostDto.CaseTypeId;
                case1.AffairStatus = AffairStatus.Encoded;
                case1.PhoneNumber2 = caseEncodePostDto.PhoneNumber2;
                case1.Representative = caseEncodePostDto.Representative;

                
               
                 _dbContext.Cases.Update(case1);
                await _dbContext.SaveChangesAsync();



                return case1.Id.ToString();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<CaseEncodeGetDto>> GetAll(Guid userId)
        {
            try
            {
                List<CaseEncodeGetDto> cases2 = new List<CaseEncodeGetDto>();
                List<CaseEncodeGetDto> cases =
                    await _dbContext.Cases.Where(ca => ca.CreatedBy.Equals(userId) && ca.AffairStatus.Equals(AffairStatus.Encoded))
                    .Include(p => p.Employee)
                    .Include(p => p.CaseType)
                    .Include(p => p.Applicant)

                    .Select(st => new CaseEncodeGetDto
                    {
                        Id = st.Id,
                        CaseNumber = st.CaseNumber,
                        LetterNumber = st.LetterNumber,
                        LetterSubject = st.LetterSubject,
                        CaseTypeName = st.CaseType.CaseTypeTitle,
                        ApplicantName = st.Applicant.ApplicantName,
                        EmployeeName = st.Employee.FullName,
                        ApplicantPhoneNo = st.Applicant.PhoneNumber,
                        EmployeePhoneNo = st.Employee.PhoneNumber,
                        ApplicantId = st.ApplicantId.ToString(),
                        CaseTypeId = st.CaseTypeId.ToString(),
                        Representative = st.Representative,
                        CreatedAt = st.CreatedAt.ToString(),


                    }).OrderByDescending(x=>x.CreatedAt).ToListAsync();

                foreach (var item in cases)
                {


                    item.Attachments = await _dbContext.CaseAttachments.Where(x => x.CaseId == item.Id).Select(x => new SelectListDto
                    {
                        Name = x.FilePath,
                        Id = x.Id

                    }).ToListAsync();

                    cases2.Add(item);


                }

                return cases2;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<CaseEncodeGetDto> GetSingleCase(Guid caseId)
        {
            try
            {

                CaseEncodeGetDto case1 =
                    await _dbContext.Cases.Where(ca => ca.Id == caseId)
                    .Include(p => p.Employee)
                    .Include(p => p.CaseType)
                    .Include(p => p.Applicant)

                    .Select(st => new CaseEncodeGetDto
                    {
                        Id = st.Id,
                        CaseNumber = st.CaseNumber,
                        LetterNumber = st.LetterNumber,
                        LetterSubject = st.LetterSubject,
                        CaseTypeName = st.CaseType.CaseTypeTitle,
                        ApplicantName = st.Applicant.ApplicantName,
                        EmployeeName = st.Employee.FullName,
                        ApplicantPhoneNo = st.Applicant.PhoneNumber,
                        EmployeePhoneNo = st.Employee.PhoneNumber,
                        ApplicantId = st.ApplicantId.ToString(),
                        CaseTypeId = st.CaseTypeId.ToString(),
                        Representative = st.Representative,
                        CreatedAt = st.CreatedAt.ToString(),


                    }).FirstOrDefaultAsync();



                case1.Attachments = await _dbContext.CaseAttachments.Where(x => x.CaseId == case1.Id).Select(x => new SelectListDto
                {
                    Name = x.FilePath,
                    Id = x.Id

                }).ToListAsync();






                return case1;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
        public async Task<string> GetCaseNumber()
        {
            string CaseNumber = "DDC2015-";

            var latestNumber = _dbContext.Cases.OrderByDescending(x => x.CreatedAt).Select(c => c.CaseNumber).FirstOrDefault();

            if (latestNumber != null)
            {
                int currCaseNumber = int.Parse(latestNumber.Split('-')[1]);
                CaseNumber += (currCaseNumber + 1).ToString();
            }
            else
            {
                CaseNumber += "1";
            }

            return CaseNumber;

        }

        public async Task<List<CaseEncodeGetDto>> GetAllTransfred(Guid employeeId)


        {

            Employee user = _dbContext.Employees.Include(x => x.OrganizationalStructure).Where(x => x.Id == employeeId).FirstOrDefault();

            List<CaseEncodeGetDto> notfications = new List<CaseEncodeGetDto>();

            if (user.Position == Position.Secertary)
            {
                notfications = await _dbContext.CaseHistories.Include(c
                   => c.Case.CaseType).Include(x => x.Case.Applicant).Where(x => x.ToStructureId == user.OrganizationalStructureId &&
                 (x.AffairHistoryStatus == AffairHistoryStatus.Pend || x.AffairHistoryStatus == AffairHistoryStatus.Transfered) &&
                 (!x.IsConfirmedBySeretery)).Select(x => new CaseEncodeGetDto
                 {
                     Id = x.Id,
                     CaseTypeName = x.Case.CaseType.CaseTypeTitle,
                     CaseNumber = x.Case.CaseNumber,
                     CreatedAt = x.CreatedAt.ToString(),
                     ApplicantName = x.Case.Applicant.ApplicantName,
                     ApplicantPhoneNo = x.Case.Applicant.PhoneNumber,
                     EmployeeName = x.Case.Employee.FullName,
                     EmployeePhoneNo = x.Case.Employee.PhoneNumber,
                     LetterNumber = x.Case.LetterNumber,
                     LetterSubject = x.Case.LetterSubject,
                     FromStructure = x.FromStructure.StructureName,
                     ToEmployee = x.ToEmployee.FullName,
                     ToStructure = x.ToStructure.StructureName,
                     FromEmployeeId = x.FromEmployee.FullName,
                     ReciverType = x.ReciverType.ToString(),
                     SecreateryNeeded = x.SecreateryNeeded,
                     IsConfirmedBySeretery = x.IsConfirmedBySeretery,
                     Position = user.Position.ToString(),
                     AffairHistoryStatus = x.AffairHistoryStatus.ToString(),



                 }).ToListAsync();
            }
            else
            {
                notfications = await _dbContext.CaseHistories.Where(x => x.ToEmployeeId == employeeId && (x.AffairHistoryStatus == AffairHistoryStatus.Pend || x.AffairHistoryStatus == AffairHistoryStatus.Transfered)).Select(x => new CaseEncodeGetDto
                {
                    Id = x.Id,
                    CaseTypeName = x.Case.CaseType.CaseTypeTitle,
                    CaseNumber = x.Case.CaseNumber,
                    CreatedAt = x.CreatedAt.ToString(),
                    ApplicantName = x.Case.Applicant.ApplicantName,
                    ApplicantPhoneNo = x.Case.Applicant.PhoneNumber,
                    EmployeeName = x.Case.Employee.FullName,
                    EmployeePhoneNo = x.Case.Employee.PhoneNumber,
                    LetterNumber = x.Case.LetterNumber,
                    LetterSubject = x.Case.LetterSubject,
                    FromStructure = x.FromStructure.StructureName,
                    FromEmployeeId = x.FromEmployee.FullName,
                    ReciverType = x.ReciverType.ToString(),
                    SecreateryNeeded = x.SecreateryNeeded,
                    IsConfirmedBySeretery = x.IsConfirmedBySeretery,
                    AffairHistoryStatus = x.AffairHistoryStatus.ToString(),
                    ToEmployee = x.ToEmployee.FullName,
                    ToStructure = x.ToStructure.StructureName,
                    Position = user.Position.ToString(),

                }).ToListAsync(); ;
            }
            return notfications.OrderByDescending(x => x.CreatedAt).ToList();
        }



        public async Task<List<CaseEncodeGetDto>> MyCaseList(Guid employeeId)
        {
            Employee user = _dbContext.Employees.Include(x => x.OrganizationalStructure).Where(x => x.Id == employeeId).FirstOrDefault();


            if (user.Position == Position.Secertary)
            {
                var HeadEmployees =
                    _dbContext.Employees.Include(x => x.OrganizationalStructure).Where(
                        x =>
                            x.OrganizationalStructureId == user.OrganizationalStructureId &&
                            x.Position == Position.Director).ToList();
                var allAffairHistory = await _dbContext.CaseHistories
                    .Include(x => x.Case)
                    .Include(x => x.FromEmployee)
                    .Include(x => x.FromStructure)
                    .OrderByDescending(x => x.CreatedAt)
                    .Where(x => ((x.ToEmployee.OrganizationalStructureId == user.OrganizationalStructureId &&
                                x.ToEmployee.Position == Position.Director && !x.IsConfirmedBySeretery)
                                || (x.FromEmployee.OrganizationalStructureId == user.OrganizationalStructureId &&
                                x.FromEmployee.Position == Position.Director &&
                                !x.IsForwardedBySeretery &&
                                !x.IsConfirmedBySeretery && x.SecreateryNeeded)
                                ) && x.AffairHistoryStatus != AffairHistoryStatus.Seen).Select(x => new CaseEncodeGetDto
                                {
                                    Id = x.Id,
                                    CaseTypeName = x.Case.CaseType.CaseTypeTitle,
                                    CaseNumber = x.Case.CaseNumber,
                                    CreatedAt = x.Case.CreatedAt.ToString(),
                                    ApplicantName = x.Case.Applicant.ApplicantName,
                                    ApplicantPhoneNo = x.Case.Applicant.PhoneNumber,
                                    EmployeeName = x.Case.Employee.FullName,
                                    EmployeePhoneNo = x.Case.Employee.PhoneNumber,
                                    LetterNumber = x.Case.LetterNumber,
                                    LetterSubject = x.Case.LetterSubject,
                                    Position = user.Position.ToString(),
                                    FromStructure = x.FromStructure.StructureName,
                                    FromEmployeeId = x.FromEmployee.FullName,
                                    ReciverType = x.ReciverType.ToString(),
                                    SecreateryNeeded = x.SecreateryNeeded,
                                    IsConfirmedBySeretery = x.IsConfirmedBySeretery,
                                    ToEmployee = x.ToEmployee.FullName,
                                    ToStructure = x.ToStructure.StructureName,
                                    AffairHistoryStatus = x.AffairHistoryStatus.ToString()
                                }).ToListAsync();
                ;



                return allAffairHistory;
            }
            else
            {
                var allAffairHistory = await _dbContext.CaseHistories
                .Include(x => x.Case)

                .Include(x => x.FromEmployee)
                .Include(x => x.FromStructure)
                .OrderByDescending(x => x.CreatedAt)
                .Where(x => x.AffairHistoryStatus != AffairHistoryStatus.Completed
                            //&& x.AffairHistoryStatus != AffairHistoryStatus.Waiting
                            && x.AffairHistoryStatus != AffairHistoryStatus.Transfered
                            && x.AffairHistoryStatus != AffairHistoryStatus.Revert
                            && x.ToEmployeeId == employeeId).Select(x => new CaseEncodeGetDto
                            {
                                Id = x.Id,
                                CaseTypeName = x.Case.CaseType.CaseTypeTitle,
                                CaseNumber = x.Case.CaseNumber,
                                CreatedAt = x.Case.CreatedAt.ToString(),
                                ApplicantName = x.Case.Applicant.ApplicantName,
                                ApplicantPhoneNo = x.Case.Applicant.PhoneNumber,
                                EmployeeName = x.Case.Employee.FullName,
                                EmployeePhoneNo = x.Case.Employee.PhoneNumber,
                                LetterNumber = x.Case.LetterNumber,
                                LetterSubject = x.Case.LetterSubject,
                                Position = user.Position.ToString(),
                                FromStructure = x.FromStructure.StructureName,
                                FromEmployeeId = x.FromEmployee.FullName,
                                ReciverType = x.ReciverType.ToString(),
                                SecreateryNeeded = x.SecreateryNeeded,
                                IsConfirmedBySeretery = x.IsConfirmedBySeretery,
                                ToEmployee = x.ToEmployee.FullName,
                                ToStructure = x.ToStructure.StructureName,
                                AffairHistoryStatus = x.AffairHistoryStatus.ToString()
                            }).ToListAsync();

                return allAffairHistory;
            }

        }


        public async Task<List<CaseEncodeGetDto>> SearchCases(string filter)
        {


            var allAffairHistory = await _dbContext.CaseHistories
                   .Include(x => x.Case).ThenInclude(x => x.Applicant)
                   .Include(x => x.Case).ThenInclude(x => x.Employee)
                   .Include(x => x.FromEmployee)
                   .Include(x => x.FromStructure)
                   .OrderByDescending(x => x.CreatedAt)
                   .Where(x => (x.Case.Applicant.ApplicantName.ToLower().Contains(filter.ToLower()) || x.Case.Applicant.PhoneNumber.Contains(filter) || x.Case.CaseNumber.ToLower().Contains(filter.ToLower())) && x.ReciverType == ReciverType.Orginal)
.Select(x => new CaseEncodeGetDto
{
    Id = x.Id,
    CaseTypeName = x.Case.CaseType.CaseTypeTitle,
    CaseNumber = x.Case.CaseNumber,
    CreatedAt = x.Case.CreatedAt.ToString(),
    ApplicantName = x.Case.Applicant.ApplicantName,
    ApplicantPhoneNo = x.Case.Applicant.PhoneNumber,
    EmployeeName = x.Case.Employee.FullName,
    EmployeePhoneNo = x.Case.Employee.PhoneNumber,
    LetterNumber = x.Case.LetterNumber,
    LetterSubject = x.Case.LetterSubject,
    Position = "",
    FromStructure = x.FromStructure.StructureName,
    FromEmployeeId = x.FromEmployee.FullName,
    ReciverType = x.ReciverType.ToString(),
    SecreateryNeeded = x.SecreateryNeeded,
    IsConfirmedBySeretery = x.IsConfirmedBySeretery,
    ToEmployee = x.ToEmployee.FullName,
    ToStructure = x.ToStructure.StructureName,
    AffairHistoryStatus = x.AffairHistoryStatus.ToString()
}).ToListAsync();




            return allAffairHistory;

        }


        public async Task<List<CaseEncodeGetDto>> CompletedCases()
        {
            // Employee user = _dbContext.Employees.Include(x => x.OrganizationalStructure).Where(x => x.Id == employeeId).FirstOrDefault();


            List<CaseEncodeGetDto> cases = await _dbContext.Cases.Where(ca => ca.AffairStatus.Equals(AffairStatus.Completed) && !ca.IsArchived).Include(p => p.Employee).Include(p => p.CaseType).Include(p => p.Applicant).Select(st => new CaseEncodeGetDto
            {

                Id = st.Id,
                CaseNumber = st.CaseNumber,
                LetterNumber = st.LetterNumber,
                LetterSubject = st.LetterSubject,
                CaseTypeName = st.CaseType.CaseTypeTitle,
                ApplicantName = st.Applicant.ApplicantName,
                EmployeeName = st.Employee.FullName,
                ApplicantPhoneNo = st.Applicant.PhoneNumber,
                EmployeePhoneNo = st.Employee.PhoneNumber,
                CreatedAt = st.CreatedAt.ToString(),
                AffairHistoryStatus = st.AffairStatus.ToString()

            }).ToListAsync();

            return cases;

        }


        public async Task<List<CaseEncodeGetDto>> GetArchivedCases()
        {


            List<CaseEncodeGetDto> cases = await _dbContext.Cases.Where(ca => ca.IsArchived).Include(p => p.Employee).Include(p => p.CaseType).Include(p => p.Applicant).Include(x => x.Folder.Row.Shelf).Select(st => new CaseEncodeGetDto
            {

                Id = st.Id,
                CaseNumber = st.CaseNumber,
                LetterNumber = st.LetterNumber,
                LetterSubject = st.LetterSubject,
                CaseTypeName = st.CaseType.CaseTypeTitle,
                ApplicantName = st.Applicant.ApplicantName,
                EmployeeName = st.Employee.FullName,
                ApplicantPhoneNo = st.Applicant.PhoneNumber,
                EmployeePhoneNo = st.Employee.PhoneNumber,
                CreatedAt = st.CreatedAt.ToString(),
                AffairHistoryStatus = st.AffairStatus.ToString(),
                FolderName = st.Folder.FolderName,
                RowNumber = st.Folder.Row.RowNumber,
                ShelfNumber = st.Folder.Row.Shelf.ShelfNumber

            }).ToListAsync();

            return cases;



        }


    }



}




