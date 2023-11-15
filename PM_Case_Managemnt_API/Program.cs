using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PM_Case_Managemnt_API.Data;
using PM_Case_Managemnt_API.Helpers;
using PM_Case_Managemnt_API.Hubs;
using PM_Case_Managemnt_API.Hubs.EncoderHub;
using PM_Case_Managemnt_API.Models.Auth;
using PM_Case_Managemnt_API.Services.CaseMGMT;
using PM_Case_Managemnt_API.Services.CaseMGMT.Applicants;
using PM_Case_Managemnt_API.Services.CaseMGMT.AppointmentService;
using PM_Case_Managemnt_API.Services.CaseMGMT.AppointmentWithCalenderService;
using PM_Case_Managemnt_API.Services.CaseMGMT.CaseAttachments;
using PM_Case_Managemnt_API.Services.CaseMGMT.CaseForwardService;
using PM_Case_Managemnt_API.Services.CaseMGMT.CaseMessagesService;
using PM_Case_Managemnt_API.Services.CaseMGMT.FileInformationService;
using PM_Case_Managemnt_API.Services.CaseMGMT.History;
using PM_Case_Managemnt_API.Services.CaseService.CaseTypes;
using PM_Case_Managemnt_API.Services.CaseService.Encode;
using PM_Case_Managemnt_API.Services.CaseService.FileSettings;
using PM_Case_Managemnt_API.Services.Common;
using PM_Case_Managemnt_API.Services.Common.Dashoboard;
using PM_Case_Managemnt_API.Services.Common.FolderService;
using PM_Case_Managemnt_API.Services.Common.RowService;
using PM_Case_Managemnt_API.Services.Common.ShelfService;
using PM_Case_Managemnt_API.Services.PM;
using PM_Case_Managemnt_API.Services.PM.Activity;
using PM_Case_Managemnt_API.Services.PM.Commite;
using PM_Case_Managemnt_API.Services.PM.Plan;
using PM_Case_Managemnt_API.Services.PM.Program;
using PM_Case_Managemnt_API.Services.PM.ProgressReport;
using System.Text;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddCors(policyBuilder =>
    policyBuilder.AddDefaultPolicy(policy =>
        policy.WithOrigins("*").AllowAnyHeader().AllowAnyHeader())
);


builder.Services.AddControllers().AddJsonOptions(
    options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
    });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.Configure<ApplicationSettings>(builder.Configuration.GetSection("ApplicationSettings"));

builder.Services.AddDbContext<DBContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddDbContext<AuthenticationContext>(options =>
           options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddDefaultIdentity<ApplicationUser>()
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<AuthenticationContext>();

builder.Services.AddSingleton<IConfiguration>(builder.Configuration);

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 4;
}
        );
builder.Services.Configure<FormOptions>(o =>
{
    o.ValueLengthLimit = int.MaxValue;
    o.MultipartBodyLengthLimit = int.MaxValue;
    o.MemoryBufferThreshold = int.MaxValue;
});


builder.Services.AddScoped<IOrganizationProfileService, OrganzationProfileService>();
builder.Services.AddScoped<IOrgBranchService, OrgBranchService>();
builder.Services.AddScoped<IOrgStructureService, OrgStructureService>();
builder.Services.AddScoped<IBudgetyearService, BudgetYearService>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IUnitOfMeasurmentService, UnitOfMeasurmentService>();

builder.Services.AddScoped<IFolderService, FolderService>();
builder.Services.AddScoped<IRowService, RowService>();
builder.Services.AddScoped<IShelfService, ShelfService>();

builder.Services.AddScoped<IProgramService, ProgramService>();
builder.Services.AddScoped<IPlanService, PlanService>();
builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<ICommiteService, CommiteService>();
builder.Services.AddScoped<IActivityService, ActivityService>();

builder.Services.AddScoped<ICaseTypeService, CaseTypeService>();
builder.Services.AddScoped<IFileSettingsService, FileSettingService>();
builder.Services.AddScoped<ICaseEncodeService, CaseEncodeService>();
builder.Services.AddScoped<ICaseAttachementService, CaseAttachementService>();
builder.Services.AddScoped<IApplicantService, ApplicantService>();
builder.Services.AddScoped<ICaseHistoryService, CaseHistoryService>();
builder.Services.AddScoped<ICaseForwardService, CaseForwardService>();
builder.Services.AddScoped<ICaseMessagesService, CaseMessagesService>();
builder.Services.AddScoped<IAppointmentService, AppointmentService>();
builder.Services.AddScoped<IAppointmentWithCalenderService, AppointmentWithCalenderService>();
builder.Services.AddScoped<IFilesInformationService, FilesInformationService>();
builder.Services.AddScoped<ICaseProccessingService, CaseProccessingService>();
builder.Services.AddScoped<ICaseReportService, CaserReportService>();
builder.Services.AddScoped<IDashboardService,DashboardService>();
builder.Services.AddScoped<ICaseIssueService, CaseIssueService>();
builder.Services.AddScoped<ISMSHelper, SMSHelper>();
builder.Services.AddScoped<IProgressReportService, ProgressReportService>();

//Jwt Authentication

var key = Encoding.UTF8.GetBytes(builder.Configuration["ApplicationSettings:JWT_Secret"].ToString());

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = false;
    x.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
        ClockSkew = TimeSpan.Zero
    };
});



builder.Services.AddSwaggerGen();

builder.Services.AddSignalR();
builder.Services.AddLogging();


var app = builder.Build();

//app.Urls.Add("http://192.168.1.216:9000");

app.UseCors(cors =>
           cors.WithOrigins("*")
           .AllowAnyHeader()
           .AllowAnyMethod()
           );

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "PM_Case"));
}

app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Assets")),
    RequestPath = new PathString("/Assets")
});

app.UseAuthentication();

app.UseRouting();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHub<EncoderHub>("/ws/Encoder");
}
);

app.UseDeveloperExceptionPage();
app.MapControllers();

app.Run();
