﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.CaseDto;
using PM_Case_Managemnt_API.Helpers;
using PM_Case_Managemnt_API.Models.CaseModel;
using PM_Case_Managemnt_API.Models.Common;

namespace PM_Case_Managemnt_API.Services.CaseMGMT.AppointmentWithCalender
{
    public class AppointmentWithCalenderService: IAppointmentWithCalenderService
    {
        private readonly DBContext _dbContext;
        private readonly ISMSHelper _smsService;

        public AppointmentWithCalenderService(DBContext dbContext,ISMSHelper sMSHelper)
        {
            _dbContext = dbContext;
            _smsService = sMSHelper;
        }

        public async Task<AppointmentGetDto> Add(AppointmentWithCalenderPostDto appointmentWithCalender)
        {
            try
            {
                //DateTime dateTime= DateTime.Now;

                //if (!string.IsNullOrEmpty(appointmentWithCalender.AppointementDate))
                //{
                //    string[] startDate = appointmentWithCalender.AppointementDate.Split(new string[] { "/" }, StringSplitOptions.RemoveEmptyEntries);
                //    dateTime = XAPI.EthiopicDateTime.GetGregorianDate(Int32.Parse(startDate[0]), Int32.Parse(startDate[1]), Int32.Parse(startDate[2]));
                //}
                var hist = _dbContext.CaseHistories.Find(appointmentWithCalender.CaseId);

                AppointementWithCalender appointment = new()
                {
                    Id = Guid.NewGuid(),
                    CreatedAt = DateTime.UtcNow,
                    CreatedBy = appointmentWithCalender.CreatedBy,
                    AppointementDate = appointmentWithCalender.AppointementDate,
                    EmployeeId = appointmentWithCalender.EmployeeId,
                    RowStatus = RowStatus.Active,
                    Remark = appointmentWithCalender.Remark,
                    Time = appointmentWithCalender.Time,
                    
                    //TODO: Check if this is not null
                    CaseId = hist.CaseId,
                };

                Case cases = _dbContext.Cases.Include(x => x.Applicant).FirstOrDefault(x => x.Id == hist.CaseId);

                //TODO: Check if the time and date used matches the format

                string message = cases.Applicant.ApplicantName + " ለጉዳይ ቁጥር፡ " + cases.CaseNumber + "\n በ " + appointmentWithCalender.AppointementDate + " ቀን በ " + appointmentWithCalender.Time +
                 " ሰዐት በቢሮ ቁጥር፡ - ይገኙ";


               bool isSmssent= await _smsService.UnlimittedMessageSender(cases.Applicant.PhoneNumber, message, appointment.CreatedBy.ToString());

                if (!isSmssent)
                    await _smsService.UnlimittedMessageSender(cases.PhoneNumber2, message, appointment.CreatedBy.ToString());

                await _dbContext.AppointementWithCalender.AddAsync(appointment);
                await _dbContext.SaveChangesAsync();


                AppointmentGetDto ev = new()
                {
                    id = appointment.Id.ToString(),
                    description = "Appointment with " + cases.Applicant.ApplicantName + " at " + appointment.Time + "\n Affair Number " + cases.CaseNumber,
                    date = appointment.AppointementDate.ToString(),
                    everyYear = false,
                    type = "event",
                    name = "Appointment "
                };


                return ev;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<AppointmentGetDto>> GetAll(Guid employeeId)
        {
            //TODO: Better error handling and logging
            try
            {

                List<AppointmentGetDto> Events = new();

                var appointments = await _dbContext.AppointementWithCalender
                    .Where(x => x.EmployeeId == employeeId)
                    .Include(a => a.Case)
                    .ToListAsync();

                var events = appointments.Select(a => new AppointmentGetDto
                {
                    id = a.Id.ToString(),
                    description = $"Appointment with {a.Case?.Applicant?.ApplicantName ?? "Unknown"} at {a.Time}\n Affair Number {a.Case?.CaseNumber}",
                    date = a.AppointementDate.ToString(),
                    everyYear = false,
                    type = "event",
                    name = string.IsNullOrEmpty(a.Remark) ? "Appointment" : a.Remark
                }).ToList();

                return Events;
               
            } catch(Exception ex) {
                throw new Exception(ex.Message);
            }
        }

    }
}
