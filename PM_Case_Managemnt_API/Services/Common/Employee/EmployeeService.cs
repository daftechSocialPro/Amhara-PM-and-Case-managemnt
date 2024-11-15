using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Models.CaseModel;
using PM_Case_Managemnt_API.Models.Common;



namespace PM_Case_Managemnt_API.Services.Common
{
    public class EmployeeService : IEmployeeService
    {

        private readonly DBContext _dBContext;
        private readonly AuthenticationContext _authentication;
        public EmployeeService(DBContext context, AuthenticationContext authentication)
        {
            _dBContext = context;
            _authentication = authentication;
        }

        public async Task<int> CreateEmployee(EmployeeDto employee)
        {
            try
            {
                if (employee.Id == null || employee.Id == Guid.Empty)
                {
                    employee.Id = Guid.NewGuid();

                }

                Employee employee1 = new Employee
                {
                    Id = (Guid)employee.Id,
                    CreatedAt = DateTime.Now,
                    Photo = employee.Photo,
                    FullName = employee.FullName,
                    Title = employee.Title,
                    PhoneNumber = employee.PhoneNumber,
                    Gender = Enum.Parse<Gender>(employee.Gender),
                    Remark = employee.Remark,
                    OrganizationalStructureId = Guid.Parse(employee.StructureId),
                    Position = Enum.Parse<Position>(employee.Position),
                    MobileUsersMacaddress = "1234",
                    UserName = employee.FullName.Split(' ')[0],
                    Password = "123456"

                };

                await _dBContext.Employees.AddAsync(employee1);
                await _dBContext.SaveChangesAsync();
                return 1;
            }
            catch (Exception ex)
            {
                return -1;
            }

        }

        public async Task<List<SelectListDto>> GetEmployeesNoUserSelectList(Guid subOrgId)
        {
            var emp = _authentication.ApplicationUsers.Where(j => j.SubsidiaryOrganizationId == subOrgId).Select(x => x.EmployeesId).ToList();


            //var EmployeeSelectList = await (from e in _dBContext.Employees
            //                                where e.OrganizationalStructure.SubsidiaryOrganizationId == subOrgId && !emp.Contains(e.Id)
            //                                select new SelectListDto
            //                                {
            //                                    Id = e.Id,
            //                                    Name = e.FullName

            //                                }).ToListAsync();
            var EmployeeSelectList = await _dBContext.Employees.Include(x => x.OrganizationalStructure).Where(e =>
                                                e.OrganizationalStructure.SubsidiaryOrganizationId == subOrgId && !emp.Contains(e.Id))
                                            .Select(e => new SelectListDto
                                            {
                                                Id = e.Id,
                                                Name = e.FullName
                                            })
                                            .ToListAsync();

            return EmployeeSelectList;

        }



        public async Task<List<EmployeeDto>> GetEmployees(Guid subOrgId)
        {
            var k = await (from e in _dBContext.Employees.Include(x => x.OrganizationalStructure).Where(x => x.OrganizationalStructure.SubsidiaryOrganizationId == subOrgId)
                           join x in _dBContext.OrganizationalStructures on e.OrganizationalStructure.OrganizationBranchId equals x.Id

                           select new EmployeeDto
                           {
                               Id = e.Id,
                               Photo = e.Photo,
                               Title = e.Title,
                               FullName = e.FullName,
                               Gender = e.Gender.ToString(),
                               PhoneNumber = e.PhoneNumber,
                               Position = e.Position.ToString(),
                               StructureName = e.OrganizationalStructure.StructureName,
                               BranchId = e.OrganizationalStructure.OrganizationBranchId.ToString(),
                               StructureId = e.OrganizationalStructureId.ToString(),
                               Remark = e.Remark,
                               BranchName = x.StructureName,
                               RowStatus = e.RowStatus == RowStatus.Active ? 0 : 1

                           }).ToListAsync();

            return k;
        }

        public async Task<EmployeeDto> GetEmployeesById(Guid employeeId)
        {

            try
            {
                var k = await (from e in _dBContext.Employees.Include(x => x.OrganizationalStructure.ParentStructure).Where(x => x.Id == employeeId)

                               select new EmployeeDto
                               {
                                   Id = e.Id,
                                   Photo = e.Photo,
                                   Title = e.Title,
                                   FullName = e.FullName,
                                   Gender = e.Gender.ToString(),
                                   PhoneNumber = e.PhoneNumber,
                                   Position = e.Position.ToString(),
                                   StructureName = e.OrganizationalStructure.StructureName,
                                   BranchId = e.OrganizationalStructure.OrganizationBranchId.ToString(),
                                   StructureId = e.OrganizationalStructureId.ToString(),
                                   Remark = e.Remark

                               }).FirstOrDefaultAsync();

                k.BranchId = _dBContext.OrganizationalStructures.Find(Guid.Parse(k.BranchId)) != null ? _dBContext.OrganizationalStructures.Find(Guid.Parse(k.BranchId)).StructureName : "";
                return k;
            }
            catch (Exception e)
            {
                throw (e);
            }


        }

        public async Task<List<SelectListDto>> GetEmployeesSelectList(Guid subOrgId)
        {
            var EmployeeSelectList = await (from e in _dBContext.Employees.Where(x => x.OrganizationalStructure.SubsidiaryOrganizationId == subOrgId && x.RowStatus == RowStatus.Active)

                                            select new SelectListDto
                                            {
                                                Id = e.Id,
                                                Name = e.FullName

                                            }).ToListAsync();

            return EmployeeSelectList;



        }





        public async Task<int> UpdateEmployee(EmployeeDto employeeDto)
        {


            var orgEmployee = _dBContext.Employees.Find(employeeDto.Id);


            orgEmployee.Photo = employeeDto.Photo;
            orgEmployee.Title = employeeDto.Title;
            orgEmployee.FullName = employeeDto.FullName;
            orgEmployee.Gender = Enum.Parse<Gender>(employeeDto.Gender);
            orgEmployee.PhoneNumber = employeeDto.PhoneNumber;
            orgEmployee.Remark = employeeDto.Remark;
            orgEmployee.Position = Enum.Parse<Position>(employeeDto.Position);
            orgEmployee.OrganizationalStructureId = Guid.Parse(employeeDto.StructureId);
            orgEmployee.RowStatus = employeeDto.RowStatus == 0 ? RowStatus.Active : RowStatus.InActive;


            _dBContext.Entry(orgEmployee).State = EntityState.Modified;
            await _dBContext.SaveChangesAsync();
            return 1;

        }

        //public async Task<List<SelectListDto>> GetEmployeeByStrucutreSelectList(Guid StructureId)
        //{

        //    var affairs = _dBContext.Cases.Where(x => x.AffairStatus != AffairStatus.Completed && x.AffairStatus != AffairStatus.Encoded).ToList();




        //    List<SelectListDto> employees = await (from e in _dBContext.Employees.Where(x => x.OrganizationalStructureId == StructureId && x.RowStatus == RowStatus.Active)

        //                                           select new SelectListDto
        //                                           {
        //                                               Id = e.Id,
        //                                               Name = $"{e.FullName} ( {e.Position} )"
        //                                           }).ToListAsync();
        //    foreach (var emp in employees)
        //    {
        //        int workLoad = 0;
        //        foreach (var affair in affairs)
        //        {
        //            var maxChild = _dBContext.CaseHistories.Where(x => x.CaseId == affair.Id && x.ReciverType == ReciverType.Orginal).OrderByDescending(z => z.childOrder).FirstOrDefault().childOrder;
        //            workLoad += _dBContext.CaseHistories.Count(y => y.ToEmployeeId == emp.Id && (y.childOrder == maxChild) && y.CaseId == affair.Id && y.ReciverType == ReciverType.Orginal);
        //        }
        //        emp.Name += " ( " + workLoad.ToString() + " Total Tasks )";

        //    }


        //    return employees;

        //}

        public async Task<List<SelectListDto>> GetEmployeeByStrucutreSelectList(Guid structureId)
        {
            try
            {
                // Get all relevant cases
                var relevantCases = await _dBContext.Cases
                    .Where(x => x.AffairStatus != AffairStatus.Completed && x.AffairStatus != AffairStatus.Encoded)
                    .Select(c => c.Id)
                    .ToListAsync();

                // Get all case histories for relevant cases
                var caseHistories = await _dBContext.CaseHistories
                    .Where(x => relevantCases.Contains(x.CaseId) && x.ReciverType == ReciverType.Orginal)
                    .Select(ch => new { ch.CaseId, ch.ToEmployeeId, ch.childOrder })
                    .ToListAsync();

                // Process max child orders and employee workloads in memory
                var maxChildOrders = caseHistories
                    .GroupBy(x => x.CaseId)
                    .ToDictionary(g => g.Key, g => g.Max(x => x.childOrder));

                var employeeWorkloads = caseHistories
                    .Where(ch => ch.childOrder == maxChildOrders[ch.CaseId])
                    .GroupBy(ch => ch.ToEmployeeId)
                    .ToDictionary(g => g.Key, g => g.Count());

                // Get employees with their details
                var employees = await _dBContext.Employees
                    .Where(x => x.OrganizationalStructureId == structureId && x.RowStatus == RowStatus.Active)
                    .Select(e => new SelectListDto
                    {
                        Id = e.Id,
                        Name = $"{e.FullName} ({e.Position})"
                    })
                    .ToListAsync();

                // Add workload information to employee names
                foreach (var emp in employees)
                {
                    int workload = employeeWorkloads.TryGetValue(emp.Id, out int value) ? value : 0;
                    emp.Name += $" ({workload} Total Tasks)";
                }

                return employees;
            }
            catch (Exception)
            {

                throw;
            }
        }




    }
}
