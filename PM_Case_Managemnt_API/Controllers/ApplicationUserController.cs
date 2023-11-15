using System;
using System.Collections.Generic;
using System.Formats.Asn1;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Hubs.EncoderHub;
using PM_Case_Managemnt_API.Models.Auth;
using PM_Case_Managemnt_API.Models.Common;

namespace PM_Case_Managemnt_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _singInManager;
        private readonly ApplicationSettings _appSettings;
        private AuthenticationContext _authenticationContext;
        private readonly DBContext _dbcontext;
        private IHubContext<EncoderHub, IEncoderHubInterface> _encoderHub;

        public ApplicationUserController(
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

        [HttpPost]
        [Route("Register")]
        //POST : /api/ApplicationUser/Register
        public async Task<Object> PostApplicationUser(ApplicationUserModel model)
        {
            // model.Role = "Admin";
            var applicationUser = new ApplicationUser()
            {
                UserName = model.UserName,
                Email = model.UserName + "@daftech.com",
                FullName = model.FullName,
                EmployeesId = model.EmployeeId,
            };

            try
            {
                var result = await _userManager.CreateAsync(applicationUser, model.Password);

                foreach (var role in model.Roles)
                {
                    await _userManager.AddToRoleAsync(applicationUser, role);
                }


               var emp= _dbcontext.Employees.Find(model.EmployeeId);
                emp.UserName =model.UserName;
                emp.Password= model.Password;

                _dbcontext.Entry(emp).State = EntityState.Modified;
                _dbcontext.SaveChangesAsync();



                return Ok(result);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [HttpPost]
        [Route("Login")]
        //POST : /api/ApplicationUser/Login
        public async Task<IActionResult> Login(LoginModel model)
        {

            try
            {

                var user = await _userManager.FindByNameAsync(model.UserName);
                if (user == null)
                    return BadRequest(new { message = "Username or password is incorrect." });
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
                        new Claim(_options.ClaimsIdentity.RoleClaimType,str)
                        }),
                        Expires = DateTime.UtcNow.AddDays(1),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                    var token = tokenHandler.WriteToken(securityToken);

                   // await _encoderHub.Groups.AddToGroupAsync(Context.ConnectionId, user.EmployeesId);
                    return Ok(new { token });
                }
                else
                    return BadRequest(new { message = "Username or password is incorrect." });
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }


        [HttpGet]
        [Route("getroles")]

        public async Task<List<SelectRolesListDto>> GetRolesForUser()
        {

            return await (from x in _authenticationContext.Roles

                          select new SelectRolesListDto
                          {
                              Id = x.Id,
                              Name = x.Name
                          }

                    ).ToListAsync();


        }

        [HttpGet("users")]

        public async Task<List<EmployeeDto>> getUsers()
        {


            var Users = await _authenticationContext.ApplicationUsers.ToListAsync();


            return (from u in Users
                    join e in _dbcontext.Employees.Include(x=>x.OrganizationalStructure) on u.EmployeesId equals e.Id
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

        [HttpPost("ChangePassword")]
     
        public async Task<IActionResult> ChangePassword(ChangePasswordModel model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId);
           
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return new JsonResult("Password changed successfully.");
        }





    }
}