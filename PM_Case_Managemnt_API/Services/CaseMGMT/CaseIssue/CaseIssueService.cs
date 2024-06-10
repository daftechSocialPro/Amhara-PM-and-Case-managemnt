using PM_Case_Managemnt_API.DTOS.Case;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.DTOS.CaseDto;
using PM_Case_Managemnt_API.Models.CaseModel;
using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Models.Common;
using PM_Case_Managemnt_API.Models.Case;

namespace PM_Case_Managemnt_API.Services.CaseMGMT
{
    public class CaseIssueService : ICaseIssueService
    {

        private readonly DBContext _dbContext;
        private readonly AuthenticationContext _authenticationContext;

        public CaseIssueService(DBContext dbContext, AuthenticationContext authenticationContext)
        {
            _dbContext = dbContext;
            _authenticationContext = authenticationContext;
        }

       public async Task<List<CaseEncodeGetDto>> GetNotCompletedCases(Guid subOrgId)
    {
        try
        {
            var cases = await _dbContext.Cases
                .Where(ca => ca.AffairStatus != AffairStatus.Completed && ca.SubsidiaryOrganizationId == subOrgId)
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
                    CreatedAt = st.CreatedAt.ToString(),
                    ToEmployeeId = _dbContext.CaseHistories
                        .Where(x => x.CaseId == st.Id)
                        .OrderByDescending(x => x.ChildOrder)
                        .Select(x => x.ToEmployee.FullName)
                        .FirstOrDefault() ?? "Not Assigned"
                })
                .ToListAsync();

            return cases;
        }
        catch (Exception ex)
        {
            throw new Exception("Error retrieving not completed cases", ex);
        }
    }
       public async Task IssueCase(CaseIssueDto caseAssignDto)
    {
        try
        {
            // Fetch the user ID of the employee who is assigning the case
            var user = await _authenticationContext.ApplicationUsers
                .FirstOrDefaultAsync(x => x.EmployeesId == caseAssignDto.AssignedByEmployeeId);

            if (user == null)
            {
                throw new Exception("Assigned by employee not found.");
            }

            string userId = user.Id;

            // Determine the employee to assign the case to
            var toEmployeeId = caseAssignDto.AssignedToEmployeeId == Guid.Empty
                ? await _dbContext.Employees
                    .Where(e => e.OrganizationalStructureId == caseAssignDto.AssignedToStructureId && e.Position == Position.Director)
                    .Select(e => e.Id)
                    .FirstOrDefaultAsync()
                : caseAssignDto.AssignedToEmployeeId;

            if (toEmployeeId == Guid.Empty)
            {
                throw new Exception("Assigned to employee not found.");
            }

            // Determine the CC employee
            var toEmployeeCCId = await _dbContext.Employees
                .Where(e => e.OrganizationalStructureId == caseAssignDto.ForwardedToStructureId && e.Position == Position.Director)
                .Select(e => e.Id)
                .FirstOrDefaultAsync();

            if (toEmployeeCCId == Guid.Empty)
            {
                throw new Exception("Forwarded to employee not found.");
            }

            // Create the new case issue
            var issueCase = new CaseIssue
            {
                Id = Guid.NewGuid(),
                Remark = caseAssignDto.Remark,
                CreatedAt = DateTime.Now,
                CreatedBy = Guid.Parse(userId),
                RowStatus = RowStatus.Active,
                CaseId = caseAssignDto.CaseId,
                AssignedByEmployeeId = caseAssignDto.AssignedByEmployeeId,
                AssignedToStructureId = caseAssignDto.AssignedToStructureId,
                AssignedToEmployeeId = toEmployeeId,
                ForwardedToEmployeeId = toEmployeeCCId
            };

            await _dbContext.CaseIssues.AddAsync(issueCase);
            await _dbContext.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new Exception("Error issuing case", ex);
        }
    }
    public async Task<List<CaseEncodeGetDto>> GetAll(Guid? employeeId)
    {
        try
        {
            var casesQuery = _dbContext.CaseIssues
                .Include(x => x.AssignedByEmployee.OrganizationalStructure)
                .Include(x => x.AssignedToEmployee.OrganizationalStructure)
                .Include(x => x.Case.Applicant)
                .Include(x => x.Case.Employee)
                .Where(ca => ca.IssueStatus == IssueStatus.Assigned && 
                            (ca.AssignedByEmployeeId == employeeId || 
                            ca.AssignedToEmployeeId == employeeId || 
                            ca.ForwardedToEmployeeId == employeeId))
                .Select(st => new CaseEncodeGetDto
                {
                    Id = st.Id,
                    CaseNumber = st.Case.CaseNumber,
                    LetterNumber = st.Case.LetterNumber,
                    LetterSubject = st.Case.LetterSubject,
                    CaseTypeName = st.Case.CaseType.CaseTypeTitle,
                    ApplicantName = st.Case.Applicant.ApplicantName,
                    EmployeeName = st.Case.Employee.FullName,
                    ApplicantPhoneNo = st.Case.Applicant.PhoneNumber,
                    EmployeePhoneNo = st.Case.Employee.PhoneNumber,
                    Remark = st.Remark,
                    CreatedAt = st.CreatedAt.ToString("O"),
                    IssueStatus = st.IssueStatus.ToString(),
                    AssignedTo = $"{st.AssignedToEmployee.FullName} ({st.AssignedToEmployee.OrganizationalStructure.StructureName})",
                    AssignedBy = $"{st.AssignedByEmployee.FullName} ({st.AssignedByEmployee.OrganizationalStructure.StructureName})",
                    IssueAction = st.AssignedToEmployeeId == employeeId
                });

            var cases = await casesQuery.ToListAsync();
            return cases;
        }
        catch (Exception ex)
        {
            throw new Exception("Error retrieving cases", ex);
        }
    }
    public async Task TakeAction(CaseIssueActionDto caseActionDto)
    {
        try
        {
            var issueCase = await _dbContext.CaseIssues.FindAsync(caseActionDto.IssueCaseId);
            if (issueCase == null)
            {
                throw new Exception("Case issue not found.");
            }

            if (!Enum.TryParse<IssueStatus>(caseActionDto.Action, out var newStatus))
            {
                throw new Exception("Invalid action provided.");
            }

            issueCase.IssueStatus = newStatus;
            _dbContext.Entry(issueCase).Property(curr => curr.IssueStatus).IsModified = true;
            await _dbContext.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new Exception("Error taking action on case issue", ex);
        }
    }


    }
}
