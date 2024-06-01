using Azure;
using GsmComm.PduConverter;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
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

        public async Task<ResponseMessage<string>> Add(CaseMessagesPostDto caseMessagePost)
        {
            var response = new ResponseMessage<string>();
            try
            {
                CaseMessages caseMessage = new()
                {
                    Id = Guid.NewGuid(),
                    CreatedAt = DateTime.Now,
                    CreatedBy = caseMessagePost.CreatedBy,
                    CaseId = caseMessagePost.CaseId,
                    MessageBody = caseMessagePost.MessageBody,
                    MessageFrom = caseMessagePost.MessageFrom,
                    Messagestatus = caseMessagePost.Messagestatus,
                    RowStatus = Models.Common.RowStatus.Active,
                };

                await _dbContext.CaseMessages.AddAsync(caseMessage);
                await _dbContext.SaveChangesAsync();

                response.Message = "Added Successfully";
                response.Data = "ok";
                response.Success = true;
                return response;
            }
            catch (Exception ex)
            {
                response.Message = $"{ex.Message}";
                response.Data = null;
                response.Success = false;
                response.ErrorCode = HttpStatusCode.InternalServerError.ToString();
                return response;
            }
        }

        public async Task<ResponseMessage<List<CaseUnsentMessagesGetDto>>> GetMany(Guid subOrgId, bool messageStatus = false)
        {
            var response = new ResponseMessage<List<CaseUnsentMessagesGetDto>>();
            try
            {

                List<CaseUnsentMessagesGetDto> unsent =  await (from m in _dbContext.CaseMessages.Include(x => x.Case.Applicant).Include(x => x.Case.CaseType).Where(el => el.Messagestatus.Equals(messageStatus) && el.Case.SubsidiaryOrganizationId == subOrgId)
                              select new CaseUnsentMessagesGetDto
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

                              }).ToListAsync();
                if (unsent == null){
                    response.Message = "No unsent";
                    response.Success = false;
                    response.Data = null;
                    response.ErrorCode = HttpStatusCode.NotFound.ToString();
                    return response;
                }
                
                response.Message = "Unsent fetched succesfully";
                response.Success = true;
                response.Data = unsent;
                return response;
                

            }
            catch (Exception ex)
            {
                response.Message = $"{ex.Message}";
                response.Success = false;
                response.Data = null;
                response.ErrorCode = HttpStatusCode.InternalServerError.ToString();
                return response;
            }
        }





        public async Task<ResponseMessage<string>> SemdMessages(List<CaseUnsentMessagesGetDto> Messages)
        {
            var response = new ResponseMessage<string>();
            try
            {

                string? ipAddress = _configuration["ApplicationSettings:SMS_IP"];
                string? coder = _configuration["ApplicationSettings:ORG_CODE"];

                if (ipAddress == null || coder == null){
                    response.Message = "Error while trying to send either Ip or coder is null";
                    response.Data = null;
                    response.ErrorCode = HttpStatusCode.NotFound.ToString();
                    response.Success = false;

                    return response;
                }

                foreach (var message in Messages)
                {
                    string uri = $"http://{ipAddress}/api/SmsSender?orgId={coder}&message={message.Message}&recipantNumber={message.PhoneNumber}";
                    string uri2 = $"http://{ipAddress}/api/SmsSender?orgId={coder}&message={message.Message}&recipantNumber={message.PhoneNumber2}";

                    byte[] byteArray = Encoding.UTF8.GetBytes(message.Message);
                    using (HttpClient c = new HttpClient())
                    {
                        Uri apiUri = new Uri(uri);
                        ByteArrayContent body = new ByteArrayContent(byteArray, 0, byteArray.Length);
                        MultipartFormDataContent multiPartFormData = new MultipartFormDataContent
                                {
                                    body
                                };
                        HttpResponseMessage result = await c.PostAsync(apiUri, multiPartFormData);

                        if (result.StatusCode == HttpStatusCode.OK)
                        {
                            var messa = _dbContext.CaseMessages.Find(message.Id);
                            if (messa == null){
                                response.Message = "Erro when sending.";
                                response.Success = false;
                                response.ErrorCode = HttpStatusCode.NotFound.ToString();
                                response.Data = null;
                                return response;
                            }
                            messa.Messagestatus = true;
                            _dbContext.Entry(messa).State = EntityState.Modified;
                            await _dbContext.SaveChangesAsync();

                        }
                    }

                    

                }
                response.Message = "Succesfull.";
                response.Success = true;
                response.Data = "ok";
                return response;

            }
            catch (Exception ex)
            {
                response.Message = $"{ex.Message}";
                response.Success = false;
                response.ErrorCode = HttpStatusCode.InternalServerError.ToString();
                response.Data = null;
                return response;
            }
        }

        
    }
}
