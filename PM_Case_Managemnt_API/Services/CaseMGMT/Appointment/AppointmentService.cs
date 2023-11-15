using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.CaseDto;
using PM_Case_Managemnt_API.Models.CaseModel;
using PM_Case_Managemnt_API.Models.Common;

namespace PM_Case_Managemnt_API.Services.CaseMGMT.AppointmentService
{
    public class AppointmentService: IAppointmentService
    {
        private readonly DBContext _dbContext;

        public AppointmentService(DBContext dbContext)
        {
            _dbContext = dbContext;
        }


        public async Task Add(AppointmentPostDto appointmentPostDto)
        {
            try
            {
                Appointement appointment = new()
                {
                    Id = Guid.NewGuid(),
                    CreatedAt = DateTime.Now,
                    CreatedBy = appointmentPostDto.CreatedBy,
                    CaseId = appointmentPostDto.CaseId,
                    EmployeeId = appointmentPostDto.EmployeeId,
                    IsSmsSent = false,
                    Remark = appointmentPostDto.Remark,
                    RowStatus = RowStatus.Active
                };

                await _dbContext.Appointements.AddAsync(appointment);
                await _dbContext.SaveChangesAsync();

            } catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<Appointement>> GetAll()
        {
            try
            {
                List<Appointement> appointments = await _dbContext.Appointements.Include(appointment => appointment.Employee).Include(appointment => appointment.Case).ToListAsync();
                return appointments;
            } catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
