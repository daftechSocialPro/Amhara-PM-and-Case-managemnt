using PM_Case_Managemnt_API.DTOS.Common;


namespace PM_Case_Managemnt_API.Services.Common
{
    public interface IEmployeeService
    {

        public Task<int> CreateEmployee(EmployeeDto employee);
        public Task<int> UpdateEmployee(EmployeeDto employee);
        public Task<List<EmployeeDto>> GetEmployees();
        public Task<EmployeeDto> GetEmployeesById(Guid employeeId);
        public Task<List<SelectListDto>> GetEmployeesNoUserSelectList();
      
        public Task<List<SelectListDto>> GetEmployeesSelectList();

        public Task<List<SelectListDto>> GetEmployeeByStrucutreSelectList(Guid StructureId);

       


    }
}
