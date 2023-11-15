using PM_Case_Managemnt_API.DTOS.CaseDto;

namespace PM_Case_Managemnt_API.Hubs.EncoderHub
{
    public interface IEncoderHubInterface
    {
         Task getNotification(List<CaseEncodeGetDto> notifications,string employeeId);
         Task AddDirectorToGroup(string employeeId);

    }
}
