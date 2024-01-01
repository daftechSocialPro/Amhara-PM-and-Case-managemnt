using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Hubs.EncoderHub;
using PM_Case_Managemnt_API.Models.Auth;
using PM_Case_Managemnt_API.Models.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PM_Case_Managemnt_API.Services.Auth
{
    public class AuthenticationService : IAuthenticationService
    {

        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _singInManager;
        private readonly ApplicationSettings _appSettings;
        private AuthenticationContext _authenticationContext;
        private readonly DBContext _dbcontext;
        private IHubContext<EncoderHub, IEncoderHubInterface> _encoderHub;

        public AuthenticationService(
            DBContext dbcontext,
            AuthenticationContext authenticationContext,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IOptions<ApplicationSettings> appSettings,
            IHubContext<EncoderHub, IEncoderHubInterface> encoderHub
)
        {
            _userManager = userManager;
            _singInManager = signInManager;
            _appSettings = appSettings.Value;
            _authenticationContext = authenticationContext;
            _dbcontext = dbcontext;
            _encoderHub = encoderHub;
        }

        
        
        public async Task<Object> PostApplicationUser(ApplicationUserModel model)
        {
            // model.Role = "Admin";
            var applicationUser = new ApplicationUser()
            {
                UserName = model.UserName,
                Email = model.UserName + "@daftech.com",
                FullName = model.FullName,
                EmployeesId = model.EmployeeId,
                SubsidiaryOrganizationId = model.SubsidiaryOrganizationId
            };

            try
            {
                var result = await _userManager.CreateAsync(applicationUser, model.Password);

                foreach (var role in model.Roles)
                {
                    await _userManager.AddToRoleAsync(applicationUser, role);
                }

                var subOrg = _dbcontext.SubsidiaryOrganizations.Find(model.SubsidiaryOrganizationId);
                if (subOrg.isRegulatoryBody)
                {
                    await _userManager.AddToRoleAsync(applicationUser, "Regulator");
                }
                
                if(model.EmployeeId != Guid.Empty) 
                {
                    var emp = _dbcontext.Employees.Find(model.EmployeeId);
                    emp.UserName = model.UserName;
                    emp.Password = model.Password;

                    _dbcontext.Entry(emp).State = EntityState.Modified;
                    _dbcontext.SaveChangesAsync();

                }
                
                return 1;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        
        public async Task<IActionResult> Login(LoginModel model)
        {

            try
            {

                var user = await _userManager.FindByNameAsync(model.UserName);
                if (user == null)
                    throw new Exception("Username or password is incorrect.");
                //{
                //    StatusCode = 400
                //};
                Employee emp = _dbcontext.Employees.Find(user.EmployeesId);
                string empPhoto = "";
                if (emp != null)
                    empPhoto = emp.Photo;
                if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
                {
                    //Get role assigned to the user
                    var role = await _userManager.GetRolesAsync(user);
                    var str = String.Join(",", role);
                    IdentityOptions _options = new IdentityOptions();

                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                        new Claim("UserID",user.Id.ToString()),
                        new Claim("FullName",user.FullName),
                        new Claim("EmployeeId",user.EmployeesId.ToString()),
                        new Claim("Photo",empPhoto),
                        new Claim(_options.ClaimsIdentity.RoleClaimType,str),
                        new Claim("SubsidiaryOrganizationId",user.SubsidiaryOrganizationId.ToString())
                        }),
                        Expires = DateTime.UtcNow.AddDays(1),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                    var token = tokenHandler.WriteToken(securityToken);

                    // await _encoderHub.Groups.AddToGroupAsync(Context.ConnectionId, user.EmployeesId);
                    return new ObjectResult(new { token });
                }
                else
                    throw new Exception("Username or password is incorrect.");
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }


        
        public async Task<List<SelectRolesListDto>> GetRolesForUser()
        {
            var excludedRoleName = "REGULATOR";

            return await (from x in _authenticationContext.Roles
                          where x.Name != excludedRoleName
                          select new SelectRolesListDto
                          {
                              Id = x.Id,
                              Name = x.Name
                          }

                    ).ToListAsync();
        }

        
        public async Task<List<EmployeeDto>> getUsers(Guid subOrgId)
        {


            var Users = await _authenticationContext.ApplicationUsers.Where(g => g.SubsidiaryOrganizationId == subOrgId).ToListAsync();


            return (from u in Users
                    join e in _dbcontext.Employees.Include(x => x.OrganizationalStructure) on u.EmployeesId equals e.Id
                    select new EmployeeDto
                    {

                        UserName = u.UserName,
                        FullName = e.FullName,
                        Photo = e.Photo,
                        Title = e.Title,
                        Gender = e.Gender.ToString(),
                        PhoneNumber = e.PhoneNumber,
                        StructureName = e.OrganizationalStructure.StructureName,
                        Position = e.Position.ToString(),
                        Remark = e.Remark,


                    }).ToList();
        }

       
        public async Task<IActionResult> ChangePassword(ChangePasswordModel model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId);

            if (user == null)
            {
                throw new Exception("User not found.");
            }

            var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

            if (!result.Succeeded)
            {
                return new ObjectResult(new { message = result.Errors });
            }

            return new JsonResult("Password changed successfully.");
        }
    }
}
