using PM_Case_Managemnt_API.DTOS.CaseDto;
using PM_Case_Managemnt_API.Models.CaseModel;

namespace PM_Case_Managemnt_API.Services.CaseMGMT.AppointmentService
{
    public interface IAppointmentService
    {
        public Task<ResponseMessage<Guid>> Add(AppointmentPostDto appointmentPostDto);
        public Task<ResponseMessage<List<Appointement>>> GetAll();
    }
}
