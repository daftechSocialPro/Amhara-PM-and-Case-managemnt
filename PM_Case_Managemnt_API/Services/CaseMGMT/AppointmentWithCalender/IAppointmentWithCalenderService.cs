using PM_Case_Managemnt_API.DTOS.CaseDto;
using PM_Case_Managemnt_API.Models.CaseModel;

namespace PM_Case_Managemnt_API.Services.CaseMGMT.AppointmentWithCalender
{
    public interface IAppointmentWithCalenderService
    {
        public Task<AppointmentGetDto> Add(AppointmentWithCalenderPostDto appointmentWithCalender);
        public Task<List<AppointmentGetDto>> GetAll(Guid employeeId);
    }
}
