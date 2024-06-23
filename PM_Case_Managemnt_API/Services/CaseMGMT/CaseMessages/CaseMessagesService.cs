using GsmComm.PduConverter;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.Case;
using PM_Case_Managemnt_API.Helpers;
using PM_Case_Managemnt_API.Models.CaseModel;
using PM_Case_Managemnt_API.Models.Common;
using System.Net;
using System.Text;

namespace PM_Case_Managemnt_API.Services.CaseMGMT.CaseMessagesService
{
    public class CaseMessagesService : ICaseMessagesService
    {
        private readonly DBContext _dbContext;

        private readonly IConfiguration _configuration;


        public CaseMessagesService(DBContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;

            _configuration = configuration;
        }

        public async Task Add(CaseMessagesPostDto caseMessagePost)

        {
            try
            {
                var caseMessage = new CaseMessages
                {
                    Id = Guid.NewGuid(),
                    CreatedAt = DateTime.Now,
                    CreatedBy = caseMessagePost.CreatedBy,
                    CaseId = caseMessagePost.CaseId,
                    MessageBody = caseMessagePost.MessageBody,
                    MessageFrom = caseMessagePost.MessageFrom,
                    Messagestatus = caseMessagePost.Messagestatus,
                    RowStatus = RowStatus.Active, 
                };

                await _dbContext.CaseMessages.AddAsync(caseMessage);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error adding case message", ex);
            }
        }


        public async Task<List<CaseUnsentMessagesGetDto>> GetMany(Guid subOrgId, bool messageStatus = false)

        {
            try
            {
                var caseMessagesQuery = _dbContext.CaseMessages
                    .Include(m => m.Case.Applicant)
                    .Include(m => m.Case.CaseType)
                    .Where(m => m.Messagestatus == messageStatus && m.Case.SubsidiaryOrganizationId == subOrgId)
                    .Select(m => new CaseUnsentMessagesGetDto
                    {
                        Id = m.Id,
                        CaseNumber = m.Case.CaseNumber,
                        ApplicantName = m.Case.Applicant.ApplicantName,
                        LetterNumber = m.Case.LetterNumber,
                        Subject = m.Case.LetterSubject,
                        CaseTypeTitle = m.Case.CaseType.CaseTypeTitle,
                        PhoneNumber = m.Case.Applicant.PhoneNumber,
                        PhoneNumber2 = m.Case.PhoneNumber2,
                        Message = m.MessageBody,
                        MessageGroup = m.MessageFrom.ToString(),
                        IsSmsSent = m.Messagestatus
                    });

                return await caseMessagesQuery.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error retrieving case messages", ex);
            }
        }

        public async Task SendMessages(List<CaseUnsentMessagesGetDto> messages)
        {
            try
            { //TODO: better approach for getting IP and ORG_CODE
                string? ipAddress = _configuration["ApplicationSettings:SMS_IP"];
                string? orgCode = _configuration["ApplicationSettings:ORG_CODE"];

                using HttpClient httpClient = new();
                List<CaseMessages> updatedMessages = new();

                foreach (var message in messages)
                {
                    var uri1 = new Uri($"http://{ipAddress}/api/SmsSender?orgId={orgCode}&message={message.Message}&recipantNumber={message.PhoneNumber}");
                    var uri2 = new Uri($"http://{ipAddress}/api/SmsSender?orgId={orgCode}&message={message.Message}&recipantNumber={message.PhoneNumber2}");

                    HttpResponseMessage result1 = await httpClient.PostAsync(uri1, null);
                    HttpResponseMessage result2 = await httpClient.PostAsync(uri2, null);

                    if (result1.StatusCode == HttpStatusCode.OK || result2.StatusCode == HttpStatusCode.OK)
                    {
                        var caseMessage = await _dbContext.CaseMessages.FindAsync(message.Id);
                        if (caseMessage != null)
                        {
                            caseMessage.Messagestatus = true;
                            updatedMessages.Add(caseMessage);
                        }
                    }
                }

                if (updatedMessages.Count > 0)
                {
                    _dbContext.CaseMessages.UpdateRange(updatedMessages);
                    await _dbContext.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error sending messages", ex);
            }
        }

    }
}
