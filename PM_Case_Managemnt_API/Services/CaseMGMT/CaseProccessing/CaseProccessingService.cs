using Microsoft.AspNetCore.Server.IIS.Core;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.Case;
using PM_Case_Managemnt_API.DTOS.CaseDto;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Helpers;
using PM_Case_Managemnt_API.Hubs;
using PM_Case_Managemnt_API.Hubs.EncoderHub;
using PM_Case_Managemnt_API.Models.CaseModel;
using PM_Case_Managemnt_API.Models.Common;
using PM_Case_Managemnt_API.Models.PM;
using PM_Case_Managemnt_API.Services.CaseMGMT.CaseForwardService;
using PM_Case_Managemnt_API.Services.CaseMGMT.History;
using PM_Case_Managemnt_API.Services.CaseService.Encode;
using static System.Net.Mime.MediaTypeNames;

namespace PM_Case_Managemnt_API.Services.CaseMGMT
{
    public class CaseProccessingService : ICaseProccessingService
    {

        private readonly DBContext _dbContext;
        private readonly AuthenticationContext _authenticationContext;
        private readonly ISMSHelper _smshelper;
        private readonly ICaseEncodeService _caseEncodeService;
        private IHubContext<EncoderHub, IEncoderHubInterface> _encoderHub;


        public CaseProccessingService(
            DBContext dbContext, 
            AuthenticationContext authenticationContext, 
            ISMSHelper smshelper,
            ICaseEncodeService caseEncodeService,
            IHubContext<EncoderHub, IEncoderHubInterface> encoderHub          )
        {
            _dbContext = dbContext;
            _authenticationContext = authenticationContext;
            _smshelper = smshelper;
            _caseEncodeService = caseEncodeService;
            _encoderHub = encoderHub;
            
        }

    public async Task<int> ConfirmTransaction(ConfirmTranscationDto confirmTransactionDto)
    {
        try
        {
            var history = await _dbContext.CaseHistories.FindAsync(confirmTransactionDto.CaseHistoryId);
            if (history == null)
            {
                throw new KeyNotFoundException("Case history not found.");
            }

            history.IsConfirmedBySeretery = true;
            history.SecreteryConfirmationDateTime = DateTime.Now;
            history.SecreteryId = confirmTransactionDto.EmployeeId;

            _dbContext.CaseHistories.Update(history);
            return await _dbContext.SaveChangesAsync();
        }
        catch (KeyNotFoundException ex)
        {
            // Handle specific exception
            throw new Exception(ex.Message);
        }
        catch (DbUpdateException ex)
        {
            // Handle database update exceptions
            throw new Exception("An error occurred while updating the database.", ex);
        }
        catch (Exception ex)
        {
            // Handle all other exceptions
            throw new Exception("An error occurred while confirming the transaction.", ex);
        }
    }

    public async Task<int> AssignTask(CaseAssignDto caseAssignDto)
    {
        try
        {
            var user = await _authenticationContext.ApplicationUsers
                .FirstOrDefaultAsync(x => x.EmployeesId == caseAssignDto.AssignedByEmployeeId);

            if (user == null)
                throw new KeyNotFoundException("User not found");

            var caseToAssign = await _dbContext.Cases
                .Include(c => c.CaseType)
                .SingleOrDefaultAsync(el => el.Id.Equals(caseAssignDto.CaseId));

            if (caseToAssign == null)
                throw new KeyNotFoundException("Case not found");

            var toEmployee = caseAssignDto.AssignedToEmployeeId == Guid.Empty || caseAssignDto.AssignedToEmployeeId == null
                            ? await _dbContext.Employees
                                .Where(e => e.OrganizationalStructureId == caseAssignDto.AssignedToStructureId && e.Position == Position.Director)
                                .Select(e => e.Id)
                                .FirstOrDefaultAsync()
                            : caseAssignDto.AssignedToEmployeeId.GetValueOrDefault();

            var fromEmployeeStructure = await _dbContext.Employees
                .Where(x => x.Id == caseAssignDto.AssignedByEmployeeId)
                .Select(x => x.OrganizationalStructure.Id)
                .FirstOrDefaultAsync();

            caseToAssign.AffairStatus = AffairStatus.Assigned;
            _dbContext.Entry(caseToAssign).Property(curr => curr.AffairStatus).IsModified = true;

            var startupHistory = new CaseHistory
            {
                Id = Guid.NewGuid(),
                CreatedAt = DateTime.Now,
                CreatedBy = Guid.Parse(user.Id),
                RowStatus = RowStatus.Active,
                CaseId = caseAssignDto.CaseId,
                CaseTypeId = caseToAssign.CaseTypeId,
                AffairHistoryStatus = AffairHistoryStatus.Pend,
                FromEmployeeId = caseAssignDto.AssignedByEmployeeId,
                FromStructureId = fromEmployeeStructure,
                ReciverType = ReciverType.Orginal,
                ToStructureId = caseAssignDto.AssignedToStructureId,
                ToEmployeeId = toEmployee,
                SecreateryNeeded = caseAssignDto.AssignedToEmployeeId == Guid.Empty || caseAssignDto.AssignedToEmployeeId == null
            };

            await _dbContext.CaseHistories.AddAsync(startupHistory);

            if (caseAssignDto.ForwardedToStructureId != null)
            {  foreach (var structureId in caseAssignDto.ForwardedToStructureId)
            {
                var toEmployeeCC = await _dbContext.Employees
                    .Where(e => e.OrganizationalStructureId == structureId && e.Position == Position.Director)
                    .Select(e => e.Id)
                    .FirstOrDefaultAsync();

                var history = new CaseHistory
                {
                    Id = Guid.NewGuid(),
                    CreatedAt = DateTime.Now,
                    CreatedBy = Guid.Parse(user.Id),
                    CaseId = caseAssignDto.CaseId,
                    AffairHistoryStatus = AffairHistoryStatus.Pend,
                    FromEmployeeId = caseAssignDto.AssignedByEmployeeId,
                    FromStructureId = fromEmployeeStructure,
                    ToStructureId = structureId,
                    ReciverType = ReciverType.Cc,
                    ToEmployeeId = toEmployeeCC,
                    RowStatus = RowStatus.Active,
                };

                await _dbContext.CaseHistories.AddAsync(history);
            }

            await _dbContext.SaveChangesAsync();

            var assignedCases = await _caseEncodeService.GetAllTransferred(toEmployee);

            await _encoderHub.Clients.Group(toEmployee.ToString()).getNotification(assignedCases, toEmployee.ToString());

            return 1;

            }
        }
        catch (KeyNotFoundException ex)
        {
            throw new Exception($"Error: {ex.Message}");
        }
        catch (DbUpdateException ex)
        {
            throw new Exception("Database update error occurred", ex);
        }
        catch (Exception ex)
        {
            throw new Exception("An error occurred while assigning the task", ex);
        }

        return 0;
    }

    public async Task<int> CompleteTask(CaseCompleteDto caseCompleteDto)
    {
        try
        {
            // Retrieve the selected case history
            var selectedHistory = await _dbContext.CaseHistories.FindAsync(caseCompleteDto.CaseHistoryId);
            if (selectedHistory == null)
                throw new Exception("Case history not found");

            // Check authorization
            if (selectedHistory.ToEmployeeId != caseCompleteDto.EmployeeId)
                throw new Exception("You are unauthorized to complete this case.");

            // Update selected history
            selectedHistory.AffairHistoryStatus = AffairHistoryStatus.Completed;
            selectedHistory.CompletedDateTime = DateTime.Now;
            selectedHistory.Remark = caseCompleteDto.Remark;

            // Retrieve the current case and history
            var currentCase = await _dbContext.Cases
                .Include(x => x.Applicant)
                .Include(x => x.Employee)
                .FirstOrDefaultAsync(x => x.Id == selectedHistory.CaseId);
            var currentHist = await _dbContext.CaseHistories
                .Include(x => x.Case)
                .Include(x => x.ToStructure)
                .FirstOrDefaultAsync(x => x.Id == selectedHistory.Id);

            // Update current case
            currentCase.CompletedAt = DateTime.Now;
            currentCase.AffairStatus = AffairStatus.Completed;

            // Create and add activity progress
            if (currentHist != null && currentCase != null)
            {
                var employee = await _dbContext.Employees
                    .Include(x => x.OrganizationalStructure)
                    .FirstOrDefaultAsync(x => x.Id == selectedHistory.ToEmployeeId);

                if (employee != null)
                {
                    var activity = await _dbContext.Activities
                        .FirstOrDefaultAsync(x => x.CaseTypeId == currentCase.CaseTypeId && x.OrganizationalStructureId == employee.OrganizationalStructure.OrganizationBranchId);

                    if (activity != null)
                    {
                        var actTarget = await _dbContext.ActivityTargetDivisions
                            .FirstOrDefaultAsync(x => x.ActivityId == activity.Id);

                        if (actTarget != null)
                        {
                            var activityProgress = new ActivityProgress
                            {
                                Id = Guid.NewGuid(),
                                CreatedAt = DateTime.Now,
                                QuarterId = actTarget.Id,
                                ActualBudget = 0,
                                ActualWorked = 1,
                                progressStatus = ProgressStatus.SimpleProgress,
                                Remark = "From Case",
                                ActivityId = activity.Id,
                                CreatedBy = selectedHistory.CreatedBy,
                                EmployeeValueId = employee.Id,
                                CaseId = selectedHistory.Id,
                                Lat = "",
                                Lng = "",
                            };

                            _dbContext.ActivityProgresses.Add(activityProgress);
                        }
                    }
                }
            }

            // Send SMS notification
            string name = currentCase?.Applicant?.ApplicantName ?? currentCase?.Employee?.FullName ?? "Unknown";
            string message = $"{name}\nበጉዳይ ቁጥር፡ {currentCase?.CaseNumber}\nየተመዘገበ ጉዳዮ በ፡ {currentHist?.ToStructure?.StructureName} ተጠናቋል\nየቢሮ ቁጥር: - ";
                _ = await _smshelper.SendSmsForCase(message, currentHist.CaseId, currentHist.Id, selectedHistory?.CreatedBy.ToString(), MessageFrom.Complete);

            // Save changes to the database
            await _dbContext.SaveChangesAsync();

            return 1;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<int> RevertTask(CaseRevertDto revertCase)
    {
        try
        {
            // Get the current employee and selected history
            Employee currEmp = await _dbContext.Employees
                .Include(x => x.OrganizationalStructure)
                .FirstOrDefaultAsync(x => x.Id == revertCase.EmployeeId) ?? throw new Exception($"Employee with ID {revertCase.EmployeeId} not found.");
            CaseHistory selectedHistory = await _dbContext.CaseHistories
                .Include(x => x.ToEmployee)
                .Include(x => x.ToStructure)
                .FirstOrDefaultAsync(x => x.Id == revertCase.CaseHistoryId) ?? throw new Exception($"Case history with ID {revertCase.CaseHistoryId} not found.");

            // Get the user ID of the to employee
            var toUser = await _authenticationContext.ApplicationUsers
                .FirstOrDefaultAsync(appUsr => appUsr.EmployeesId == selectedHistory.ToEmployeeId) 
                ?? throw new Exception($"User with EmployeesId {selectedHistory.ToEmployeeId} not found.");
            Guid UserId = Guid.Parse(toUser.Id);

            // Update the selected history
            selectedHistory.AffairHistoryStatus = AffairHistoryStatus.Revert;
            selectedHistory.RevertedAt = DateTime.Now;
            selectedHistory.Remark = revertCase.Remark;

            // Attach the selected history and mark properties as modified
            _dbContext.CaseHistories.Attach(selectedHistory);
            _dbContext.Entry(selectedHistory).Property(x => x.AffairHistoryStatus).IsModified = true;
            _dbContext.Entry(selectedHistory).Property(x => x.RevertedAt).IsModified = true;
            _dbContext.Entry(selectedHistory).Property(x => x.Remark).IsModified = true;

            // Create a new history entry
            CaseHistory newHistory = new CaseHistory
            {
                Id = Guid.NewGuid(),
                CreatedAt = DateTime.Now,
                CreatedBy = Guid.Parse(toUser.Id),
                RowStatus = RowStatus.Active,
                FromEmployeeId = revertCase.EmployeeId,
                FromStructureId = currEmp.OrganizationalStructureId,
                ToEmployeeId = selectedHistory.ToEmployeeId,
                ToStructureId = selectedHistory.ToStructureId,
                Remark = "",
                CaseId = selectedHistory.CaseId,
                ReciverType = ReciverType.Orginal,
                ChildOrder = selectedHistory.ChildOrder += 1,
            };

            // Add the new history entry to the database
            _dbContext.CaseHistories.Add(newHistory);
            await _dbContext.SaveChangesAsync();

            // Get the current case details
            Case currentCase = await _dbContext.Cases
                .Include(x => x.Applicant)
                .Include(x => x.Employee)
                .FirstOrDefaultAsync(x => x.Id == selectedHistory.CaseId) ?? throw new Exception($"Case with ID {selectedHistory.CaseId} not found.");

            // Create the SMS message
            string name = currentCase.Applicant != null ? currentCase.Applicant.ApplicantName : currentCase.Employee.FullName;
            var message = $"{name}\nበጉዳይ ቁጥር፡{currentCase.CaseNumber}\nየተመዘገበ ጉዳዮ በ፡{selectedHistory.ToStructure.StructureName} ወደኋላ ተመልሷል\nየቢሮ ቁጥር: -";

            // Send the SMS message
            await _smshelper.SendSmsForCase(message, newHistory.CaseId, newHistory.Id, UserId.ToString(), MessageFrom.Revert);

            return 1;
        }
        catch (Exception ex)
        {
            throw new Exception($"Failed to revert case: {ex.Message}");
        }
    }

   public async Task<int> TransferCase(CaseTransferDto caseTransferDto)
{
    try
    {
        // Retrieve current employee
        Employee currEmp = (await _dbContext.Employees.FindAsync(caseTransferDto.FromEmployeeId) ?? throw new ArgumentException($"Employee with ID {caseTransferDto.FromEmployeeId} not found.")) ?? throw new ArgumentException($"Employee with ID {caseTransferDto.FromEmployeeId} not found.");

        // Retrieve current last case history
        CaseHistory currentLastHistory = await _dbContext.CaseHistories
        .Where(ch => ch.Id == caseTransferDto.CaseHistoryId)
        .OrderByDescending(ch => ch.CreatedAt)
        .FirstOrDefaultAsync() ?? throw new ArgumentException($"Case history with ID {caseTransferDto.CaseHistoryId} not found.");

        // Check authorization
        if (caseTransferDto.FromEmployeeId != currentLastHistory.ToEmployeeId)
        throw new InvalidOperationException("You are not authorized to transfer this case.");

        // Update current last case history
        currentLastHistory.AffairHistoryStatus = AffairHistoryStatus.Transfered;
        currentLastHistory.TransferedDateTime = DateTime.Now;
        _dbContext.CaseHistories.Update(currentLastHistory);

        // Get the to employee ID
        var toEmployeeId = caseTransferDto.ToEmployeeId == Guid.Empty || caseTransferDto.ToEmployeeId == null
            ? await _dbContext.Employees
                .Where(e => e.OrganizationalStructureId == caseTransferDto.ToStructureId && e.Position == Position.Director)
                .Select(e => e.Id)
                .FirstOrDefaultAsync()
            : caseTransferDto.ToEmployeeId;


        // Create new case history
        var newHistory = new CaseHistory
        {
            Id = Guid.NewGuid(),
            CreatedAt = DateTime.Now,
            CreatedBy = caseTransferDto.ToEmployeeId,
            RowStatus = RowStatus.Active,
            FromEmployeeId = caseTransferDto.FromEmployeeId,
            FromStructureId = currEmp.OrganizationalStructureId,
            ToEmployeeId = toEmployeeId,
            ToStructureId = caseTransferDto.ToStructureId,
            Remark = caseTransferDto.Remark,
            CaseId = currentLastHistory.CaseId,
            ReciverType = ReciverType.Orginal,
            CaseTypeId = currentLastHistory.CaseTypeId,
            ChildOrder = currentLastHistory.ChildOrder + 1
        };

        // Add new case history and attachments to the database
        await _dbContext.CaseHistories.AddAsync(newHistory);
        await _dbContext.CaseAttachments.AddRangeAsync(caseTransferDto.CaseAttachments);
        await _dbContext.SaveChangesAsync();

        // Send SMS notification
        Case currentCase = await _dbContext.Cases
            .Include(x => x.Applicant)
            .Include(x => x.Employee)
            .FirstOrDefaultAsync(x => x.Id == newHistory.CaseId) ?? throw new ArgumentException($"Case with ID {newHistory.CaseId} not found.");
                string name = currentCase.Applicant != null ? currentCase.Applicant.ApplicantName : currentCase.Employee.FullName;
        string toStructure = _dbContext.OrganizationalStructures.Find(newHistory.ToStructureId)?.StructureName ?? "Unknown Structure";

        var assignedCase = await _caseEncodeService.GetAllTransferred(toEmployeeId);
        await _encoderHub.Clients.Group(toEmployeeId.ToString()).getNotification(assignedCase, toEmployeeId.ToString());

        string message = $"{name}\nበጉዳይ ቁጥር፡{currentCase.CaseNumber}\nየተመዘገበ ጉዳዮ ለ {toStructure} ተላልፏል\nየቢሮ ቁጥር:";

        await _smshelper.SendSmsForCase(message, newHistory.CaseId, newHistory.Id, newHistory.CreatedBy.ToString(), MessageFrom.Transfer);
        return 1;
    }
    catch (Exception ex)
    {
        throw new Exception($"Error transferring case: {ex.Message}");
    }
}

    public async Task<int> AddToWaiting(Guid caseHistoryId)
    {
        try
        {


            var history = _dbContext.CaseHistories.Find(caseHistoryId);
            history.AffairHistoryStatus = AffairHistoryStatus.Waiting;
            history.SeenDateTime = null;
            _dbContext.CaseHistories.Attach(history);
            _dbContext.Entry(history).Property(c => c.AffairHistoryStatus).IsModified = true;
            _dbContext.Entry(history).Property(c => c.SeenDateTime).IsModified = true;



            await _dbContext.SaveChangesAsync();

            return 1;



        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<int> SendSMS(CaseCompleteDto smsdetail)
    {

        var history = _dbContext.CaseHistories.Find(smsdetail.CaseHistoryId);
        await _smshelper.SendSmsForCase(smsdetail.Remark, history.CaseId, history.Id, smsdetail.EmployeeId.ToString(), MessageFrom.Custom_text);
        return 1;
    }

    public async Task<CaseEncodeGetDto> GetCaseDetial(Guid employeeId, Guid historyId)
    {
        try
        {
            Employee? user = await _dbContext.Employees
                .Include(x => x.OrganizationalStructure)
                .FirstOrDefaultAsync(x => x.Id == employeeId);

            CaseHistory? currentHistry = await _dbContext.CaseHistories
                .Include(x => x.Case.CaseType)
                .Include(x => x.Case.Applicant)
                .Include(x => x.Case.Employee)
                .Include(x => x.FromEmployee)
                .Include(x => x.FromStructure)
                .FirstOrDefaultAsync(x => x.Id == historyId);

            if (currentHistry == null)
            {
                throw new Exception($"Case history with ID {historyId} not found.");
            }

            if (currentHistry.AffairHistoryStatus == AffairHistoryStatus.Pend ||
                currentHistry.AffairHistoryStatus == AffairHistoryStatus.Waiting ||
                currentHistry.AffairHistoryStatus == AffairHistoryStatus.Completed)
            {
                currentHistry.AffairHistoryStatus = AffairHistoryStatus.Seen;
                currentHistry.SeenDateTime = DateTime.Now;

                _dbContext.Entry(currentHistry).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
            }

            List<SelectListDto> attachments = await _dbContext.CaseAttachments
                .Where(x => x.CaseId == currentHistry.CaseId)
                .Select(x => new SelectListDto
                {
                    Id = x.Id,
                    Name = x.FilePath
                }).ToListAsync();

            attachments.AddRange(await _dbContext.FilesInformations
                .Where(x => x.CaseId == currentHistry.CaseId)
                .Select(x => new SelectListDto
                {
                    Id = x.Id,
                    Name = x.FilePath,
                    Photo = x.FileDescription
                }).ToListAsync());

            List<CaseDetailStructureDto> caseDetailstructures = await _dbContext.CaseHistories
                .Include(x => x.FromEmployee)
                .Include(x => x.FromStructure)
                .Where(x => x.CaseId == currentHistry.CaseId)
                .OrderByDescending(x => x.CreatedAt)
                .Select(x => new CaseDetailStructureDto
                {
                    FromEmployee = x.FromEmployee.FullName,
                    FormStructure = x.FromStructure.StructureName,
                    SeenDate = x.CreatedAt.ToString()
                }).ToListAsync();

            CaseEncodeGetDto result = new CaseEncodeGetDto
            {
                Id = currentHistry.Id,
                CaseTypeName = currentHistry.Case.CaseType.CaseTypeTitle,
                CaseNumber = currentHistry.Case.CaseNumber,
                CreatedAt = currentHistry.Case.CreatedAt.ToString(),
                ApplicantName = currentHistry.Case.Applicant?.ApplicantName,
                ApplicantPhoneNo = currentHistry.Case.Applicant?.PhoneNumber,
                EmployeeName = currentHistry.Case.Employee?.FullName,
                EmployeePhoneNo = currentHistry.Case.Employee?.PhoneNumber,
                LetterNumber = currentHistry.Case.LetterNumber,
                LetterSubject = currentHistry.Case.LetterSubject,
                Position = user?.Position.ToString(),
                FromStructure = currentHistry.FromStructure?.StructureName,
                FromEmployeeId = currentHistry.FromEmployee?.FullName,
                ReciverType = currentHistry.ReciverType.ToString(),
                SecreateryNeeded = currentHistry.SecreateryNeeded,
                IsConfirmedBySeretery = currentHistry.IsConfirmedBySeretery,
                ToEmployee = currentHistry.ToEmployee?.FullName,
                ToStructure = currentHistry.ToStructure?.StructureName,
                AffairHistoryStatus = currentHistry.AffairHistoryStatus.ToString(),
                Attachments = attachments,
                CaseTypeId = currentHistry.Case.CaseTypeId.ToString(),
                CaseDetailStructures = caseDetailstructures
            };

            return result;
        }
        catch (Exception ex)
        {
            throw new Exception($"Error occurred while fetching case details: {ex.Message}");
        }
    }

    public async Task<int> ArchiveCase(ArchivedCaseDto archivedCaseDto)
    {
        var cases = await _dbContext.Cases.FindAsync(archivedCaseDto.CaseId);

        cases.FolderId = archivedCaseDto.FolderId;
        cases.IsArchived = true;

        _dbContext.Entry(cases).State = EntityState.Modified;

        await _dbContext.SaveChangesAsync();

        return 1;
    }

    public async Task<CaseState> GetCaseState(Guid caseTypeId, Guid caseHistoryId)
    {
        var childCaseType = await _dbContext.CaseTypes
            .Where(x => x.ParentCaseTypeId == caseTypeId)
            .ToListAsync();

        var caseState = new CaseState();

        int childCount = _dbContext.CaseHistories.Find(caseHistoryId).ChildOrder + 1;

        foreach (var childAffair in childCaseType)
        {
            if (childAffair.OrderNumber == childCount)
            {
                caseState.CurrentState = childAffair.CaseTypeTitle;

                caseState.NeededDocuments = await _dbContext.FileSettings
                    .Where(x => x.CaseTypeId == childAffair.Id)
                    .Select(x => x.FileName)
                    .ToListAsync();
            }

            if (childAffair.OrderNumber == childCount + 1)
            {
                caseState.NextState = childAffair.CaseTypeTitle;
            }
        }

        return caseState;
    }

    public async Task<bool> IsPermitted(Guid employeeId, Guid caseId)
    {
        var caseHistory = await _dbContext.CaseHistories
            .Where(ch => ch.CaseId == caseId && ch.ReciverType == ReciverType.Orginal)
            .OrderByDescending(ch => ch.ChildOrder)
            .FirstOrDefaultAsync() ?? throw new Exception($"No original receiver found for case with ID: {caseId}");
            var employee = caseHistory.ToEmployeeId;

        var completedCaseHistories = await _dbContext.CaseHistories
            .Where(ch => ch.CaseId == caseId && ch.CompletedDateTime != null)
            .OrderBy(ch => ch.ChildOrder)
            .Select(ch => ch.CompletedDateTime)
            .ToListAsync();

        if (employeeId == employee && completedCaseHistories.Count == 0)
        {
            return true;
        }

        return false;
    }

    }
}

