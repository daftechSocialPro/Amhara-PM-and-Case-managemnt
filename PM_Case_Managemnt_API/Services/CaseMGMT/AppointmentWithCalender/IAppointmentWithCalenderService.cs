using PM_Case_Managemnt_API.DTOS.CaseDto;
using PM_Case_Managemnt_API.Models.CaseModel;

namespace PM_Case_Managemnt_API.Services.CaseMGMT.AppointmentWithCalenderService
{
    public interface IAppointmentWithCalenderService
    {
        public Task<ResponseMessage<AppointmentGetDto>> Add(AppointmentWithCalenderPostDto appointmentWithCalender);
        public Task<ResponseMessage<List<AppointmentGetDto>>> GetAll(Guid employeeId);
    }
}
