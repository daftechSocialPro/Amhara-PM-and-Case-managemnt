﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.CaseDto;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Models.CaseModel;
using PM_Case_Managemnt_API.Models.Common;


namespace PM_Case_Managemnt_API.Services.CaseMGMT.Applicants
{
    public class ApplicantService: IApplicantService
    {
        private readonly DBContext _dbContext;

        public ApplicantService(DBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Guid> Add(ApplicantPostDto applicantPost)
        {
            try
            {
                Applicant applicant = new()
                {
                    Id = Guid.NewGuid(),
                    CreatedAt = DateTime.Now,
                    CreatedBy = applicantPost.CreatedBy,
                    ApplicantName = applicantPost.ApplicantName,
                    ApplicantType = Enum.Parse<ApplicantType>( applicantPost.ApplicantType),
                    CustomerIdentityNumber = applicantPost.CustomerIdentityNumber,
                    Email = applicantPost.Email,
                    PhoneNumber = applicantPost.PhoneNumber,
                    Remark = applicantPost.PhoneNumber,
                    RowStatus = RowStatus.Active,
                    SubsidiaryOrganizationId = applicantPost.SubsidiaryOrganizationId,
                };

                await _dbContext.Applicants.AddAsync(applicant);
                await _dbContext.SaveChangesAsync();

                return applicant.Id;

            } catch (Exception)
            {
                throw new Exception("Error adding applicant");
            }
        }

    // TODO what is the purpose of this method?
        public async Task<Guid> Update(ApplicantPostDto applicantPost)
        {
            try
            {
                var applicant = await _dbContext.Applicants.FindAsync(applicantPost.ApplicantId);

                applicant.ApplicantName = applicantPost.ApplicantName;
                applicant.ApplicantType = Enum.Parse<ApplicantType>(applicantPost.ApplicantType);
                applicant.CustomerIdentityNumber = applicantPost.CustomerIdentityNumber;
                applicant.Email = applicantPost.Email;
                applicant.PhoneNumber = applicantPost.PhoneNumber;

                await _dbContext.SaveChangesAsync();

                return applicant.Id;

            }
            catch (Exception)
            {
                throw new Exception("Error adding applicant");
            }
        }

        public async Task<List<ApplicantGetDto>> GetAll(Guid subOrgId)
        {
            try
            {
                List<Applicant> applicants = await _dbContext.Applicants.Where(x => x.SubsidiaryOrganizationId == subOrgId).ToListAsync();
                List<ApplicantGetDto> applicantsList = new();

                foreach(Applicant applicant in applicants)
                {
                    applicantsList.Add(new ApplicantGetDto()
                    {
                        Id = applicant.Id,
                        CreatedAt = applicant.CreatedAt,
                        RowStatus = applicant.RowStatus
                    });
                }

                return applicantsList;

            } catch(Exception ex)
            
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Applicant> GetApplicantById(Guid? applicantId)
        {
            var applicant = await _dbContext.Applicants.FindAsync(applicantId) ?? throw new Exception("Applicant not found");
            return applicant; 
        }

        public async Task<List<SelectListDto>> GetSelectList(Guid subOrgId)
        {
            try
            {
                List<Applicant> applicants = await _dbContext.Applicants.Where(x => x.SubsidiaryOrganizationId == subOrgId).OrderBy(x => x.ApplicantName).ToListAsync();
                List<SelectListDto> selectedApplicantList = new();

                foreach (Applicant applicant in applicants)
                {
                    selectedApplicantList.Add(new SelectListDto()
                    {
                        Id = applicant.Id,
                        Name = applicant.ApplicantName + " ( " + applicant.CustomerIdentityNumber + " ) ",

                    });
                }

                return selectedApplicantList;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
