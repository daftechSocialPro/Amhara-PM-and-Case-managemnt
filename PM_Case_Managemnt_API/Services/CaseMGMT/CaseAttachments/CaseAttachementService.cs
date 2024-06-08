using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.Models.CaseModel;

namespace PM_Case_Managemnt_API.Services.CaseMGMT.CaseAttachments

// TODO; consider LINQ
{
    public class CaseAttachementService: ICaseAttachementService
    {
        private readonly DBContext _dBContext;

        public CaseAttachementService(DBContext dBContext)
        {
            _dBContext = dBContext;
        }

        public async Task AddMany(List<CaseAttachment> caseAttachments)
        {
            try
            {
                _dBContext.CaseAttachments.AddRange(caseAttachments);
                await _dBContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error adding attachments", ex);
            }
        }

        public async Task<List<CaseAttachment>> GetAll(Guid subOrgId, string? CaseId = null)
        {
            try
            {
                IQueryable<CaseAttachment> query = _dBContext.CaseAttachments;

                if (CaseId != null)
                    query = query.Where(el => el.CaseId == Guid.Parse(CaseId));
                else
                    query = query.Where(x => x.Case.SubsidiaryOrganizationId == subOrgId);

                return await query.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error getting attachments", ex);
            }
        }

        public async Task<bool> RemoveAttachment(Guid attachmentId)
        {
            try
            {
                var attachment = await _dBContext.CaseAttachments.FindAsync(attachmentId);
                
                if (attachment == null)
                    return false;

                _dBContext.CaseAttachments.Remove(attachment);
                await _dBContext.SaveChangesAsync();

                return true;
            }

            catch (Exception ex)
            {
                throw new Exception("Error removing attachment", ex);
    
            }
        }

    }
}
