using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMCaseManagemntAPI.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Applicants",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ApplicantName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CustomerIdentityNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ApplicantType = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Applicants", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CaseTypes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CaseTypeTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotlaPayment = table.Column<float>(type: "real", nullable: false),
                    Counter = table.Column<float>(type: "real", nullable: false),
                    ParentCaseTypeId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    OrderNumber = table.Column<int>(type: "int", nullable: true),
                    MeasurementUnit = table.Column<int>(type: "int", nullable: false),
                    CaseForm = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CaseTypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CaseTypes_CaseTypes_ParentCaseTypeId",
                        column: x => x.ParentCaseTypeId,
                        principalTable: "CaseTypes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Commitees",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CommiteeName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commitees", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OrganizationProfile",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrganizationNameEnglish = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrganizationNameInLocalLanguage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Logo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SmsCode = table.Column<int>(type: "int", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationProfile", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProgramBudgetYears",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FromYear = table.Column<int>(type: "int", nullable: false),
                    ToYear = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProgramBudgetYears", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StandrizedForms",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FormName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StandrizedForms", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UnitOfMeasurment",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LocalName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UnitOfMeasurment", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FileSettings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CaseTypeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FileType = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FileSettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FileSettings_CaseTypes_CaseTypeId",
                        column: x => x.CaseTypeId,
                        principalTable: "CaseTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrganizationBranches",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrganizationProfileId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsHeadOffice = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationBranches", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrganizationBranches_OrganizationProfile_OrganizationProfileId",
                        column: x => x.OrganizationProfileId,
                        principalTable: "OrganizationProfile",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BudgetYears",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Year = table.Column<int>(type: "int", nullable: false),
                    FromDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ToDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ProgramBudgetYearId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BudgetYears", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BudgetYears_ProgramBudgetYears_ProgramBudgetYearId",
                        column: x => x.ProgramBudgetYearId,
                        principalTable: "ProgramBudgetYears",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Programs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProgramName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProgramPlannedBudget = table.Column<float>(type: "real", nullable: false),
                    ProgramBudgetYearId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Programs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Programs_ProgramBudgetYears_ProgramBudgetYearId",
                        column: x => x.ProgramBudgetYearId,
                        principalTable: "ProgramBudgetYears",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FormDocuments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DocName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DocPath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StandrizedFormId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormDocuments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FormDocuments_StandrizedForms_StandrizedFormId",
                        column: x => x.StandrizedFormId,
                        principalTable: "StandrizedForms",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "OrganizationalStructures",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrganizationBranchId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ParentStructureId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    StructureName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false),
                    Weight = table.Column<float>(type: "real", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationalStructures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrganizationalStructures_OrganizationBranches_OrganizationBranchId",
                        column: x => x.OrganizationBranchId,
                        principalTable: "OrganizationBranches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrganizationalStructures_OrganizationalStructures_ParentStructureId",
                        column: x => x.ParentStructureId,
                        principalTable: "OrganizationalStructures",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Photo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gender = table.Column<int>(type: "int", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrganizationalStructureId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Position = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Employees_OrganizationalStructures_OrganizationalStructureId",
                        column: x => x.OrganizationalStructureId,
                        principalTable: "OrganizationalStructures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Cases",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CaseNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ApplicantId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LetterNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LetterSubject = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CaseTypeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CompletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    AffairStatus = table.Column<int>(type: "int", nullable: false),
                    PhoneNumber2 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Representative = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsArchived = table.Column<bool>(type: "bit", nullable: false),
                    SMSStatus = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cases", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cases_Applicants_ApplicantId",
                        column: x => x.ApplicantId,
                        principalTable: "Applicants",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Cases_CaseTypes_CaseTypeId",
                        column: x => x.CaseTypeId,
                        principalTable: "CaseTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Cases_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CommiteEmployees",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CommiteeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CommiteeEmployeeStatus = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommiteEmployees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommiteEmployees_Commitees_CommiteeId",
                        column: x => x.CommiteeId,
                        principalTable: "Commitees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CommiteEmployees_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Plans",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PlanName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BudgetYearId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    StructureId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PeriodStartAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PeriodEndAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ProjectManagerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FinanceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProgramId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PlanWeight = table.Column<float>(type: "real", nullable: false),
                    HasTask = table.Column<bool>(type: "bit", nullable: false),
                    PlandBudget = table.Column<float>(type: "real", nullable: false),
                    ProjectType = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Plans_BudgetYears_BudgetYearId",
                        column: x => x.BudgetYearId,
                        principalTable: "BudgetYears",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Plans_Employees_FinanceId",
                        column: x => x.FinanceId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Plans_Employees_ProjectManagerId",
                        column: x => x.ProjectManagerId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Plans_OrganizationalStructures_StructureId",
                        column: x => x.StructureId,
                        principalTable: "OrganizationalStructures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Plans_Programs_ProgramId",
                        column: x => x.ProgramId,
                        principalTable: "Programs",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Appointements",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CaseId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsSmsSent = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Appointements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Appointements_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Appointements_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppointementWithCalender",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AppointementDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Time = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CaseId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppointementWithCalender", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppointementWithCalender_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppointementWithCalender_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CaseAttachments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CaseId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FilePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CaseAttachments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CaseAttachments_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CaseHistories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CaseId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CaseTypeId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    FromEmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    FromStructureId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ToEmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ToStructureId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    AffairHistoryStatus = table.Column<int>(type: "int", nullable: false),
                    SeenDateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TransferedDateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CompletedDateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RevertedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ReciverType = table.Column<int>(type: "int", nullable: false),
                    IsSmsSent = table.Column<bool>(type: "bit", nullable: false),
                    IsConfirmedBySeretery = table.Column<bool>(type: "bit", nullable: false),
                    IsForwardedBySeretery = table.Column<bool>(type: "bit", nullable: false),
                    SecreateryNeeded = table.Column<bool>(type: "bit", nullable: false),
                    SecreteryConfirmationDateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SecreteryId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ForwardedDateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ForwardedById = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CaseHistories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CaseHistories_CaseTypes_CaseTypeId",
                        column: x => x.CaseTypeId,
                        principalTable: "CaseTypes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CaseHistories_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CaseHistories_Employees_ForwardedById",
                        column: x => x.ForwardedById,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CaseHistories_Employees_FromEmployeeId",
                        column: x => x.FromEmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CaseHistories_Employees_SecreteryId",
                        column: x => x.SecreteryId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CaseHistories_Employees_ToEmployeeId",
                        column: x => x.ToEmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CaseHistories_OrganizationalStructures_FromStructureId",
                        column: x => x.FromStructureId,
                        principalTable: "OrganizationalStructures",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CaseHistories_OrganizationalStructures_ToStructureId",
                        column: x => x.ToStructureId,
                        principalTable: "OrganizationalStructures",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CaseMessages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CaseId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    MessageFrom = table.Column<int>(type: "int", nullable: false),
                    MessageBody = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Messagestatus = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CaseMessages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CaseMessages_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "FilesInformations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FilePath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FileDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FileSettingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CaseId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    filetype = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FilesInformations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FilesInformations_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_FilesInformations_FileSettings_FileSettingId",
                        column: x => x.FileSettingId,
                        principalTable: "FileSettings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PlanId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TaskDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ShouldStartPeriod = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ActuallStart = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ShouldEnd = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ActualEnd = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PlanedBudget = table.Column<float>(type: "real", nullable: false),
                    ActualBudget = table.Column<float>(type: "real", nullable: true),
                    Goal = table.Column<float>(type: "real", nullable: true),
                    Weight = table.Column<float>(type: "real", nullable: true),
                    ActualWorked = table.Column<float>(type: "real", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    HasActivityParent = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tasks_Plans_PlanId",
                        column: x => x.PlanId,
                        principalTable: "Plans",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CaseHistoryAttachments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CaseHistoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FilePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CaseId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CaseHistoryAttachments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CaseHistoryAttachments_CaseHistories_CaseHistoryId",
                        column: x => x.CaseHistoryId,
                        principalTable: "CaseHistories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CaseHistoryAttachments_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ActivityParents",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TaskId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ActivityParentDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ShouldStartPeriod = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ActuallStart = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ShouldEnd = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ActualEnd = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PlanedBudget = table.Column<float>(type: "real", nullable: false),
                    ActualBudget = table.Column<float>(type: "real", nullable: true),
                    Goal = table.Column<float>(type: "real", nullable: true),
                    Weight = table.Column<float>(type: "real", nullable: true),
                    ActualWorked = table.Column<float>(type: "real", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    HasActivity = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityParents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityParents_Tasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "Tasks",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Activities",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ActivityDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ShouldStat = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ShouldEnd = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PlanedBudget = table.Column<float>(type: "real", nullable: false),
                    ActualStart = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ActualEnd = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ActualBudget = table.Column<float>(type: "real", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CommiteeId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UnitOfMeasurementId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Weight = table.Column<float>(type: "real", nullable: false),
                    Goal = table.Column<float>(type: "real", nullable: false),
                    Begining = table.Column<float>(type: "real", nullable: false),
                    ActualWorked = table.Column<float>(type: "real", nullable: false),
                    ActivityType = table.Column<int>(type: "int", nullable: false),
                    OfficeWork = table.Column<float>(type: "real", nullable: false),
                    FieldWork = table.Column<float>(type: "real", nullable: false),
                    targetDivision = table.Column<int>(type: "int", nullable: true),
                    PostToCase = table.Column<bool>(type: "bit", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PlanId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TaskId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ActivityParentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Activities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Activities_ActivityParents_ActivityParentId",
                        column: x => x.ActivityParentId,
                        principalTable: "ActivityParents",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Activities_Commitees_CommiteeId",
                        column: x => x.CommiteeId,
                        principalTable: "Commitees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Activities_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Activities_Plans_PlanId",
                        column: x => x.PlanId,
                        principalTable: "Plans",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Activities_Tasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "Tasks",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Activities_UnitOfMeasurment_UnitOfMeasurementId",
                        column: x => x.UnitOfMeasurementId,
                        principalTable: "UnitOfMeasurment",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TaskMembers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TaskId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PlanId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ActivityParentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskMembers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskMembers_ActivityParents_ActivityParentId",
                        column: x => x.ActivityParentId,
                        principalTable: "ActivityParents",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TaskMembers_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TaskMembers_Plans_PlanId",
                        column: x => x.PlanId,
                        principalTable: "Plans",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TaskMembers_Tasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "Tasks",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TaskMemos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TaskId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PlanId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ActivityParentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskMemos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskMemos_ActivityParents_ActivityParentId",
                        column: x => x.ActivityParentId,
                        principalTable: "ActivityParents",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TaskMemos_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TaskMemos_Plans_PlanId",
                        column: x => x.PlanId,
                        principalTable: "Plans",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TaskMemos_Tasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "Tasks",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ActivityTargetDivisions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ActivityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Target = table.Column<float>(type: "real", nullable: false),
                    TargetBudget = table.Column<float>(type: "real", nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityTargetDivisions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityTargetDivisions_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ActivityTerminationHistories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ActivityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FromEmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ToEmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ToCommiteId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TerminationReason = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ApprovedByDirectorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DocumentPath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Isapproved = table.Column<bool>(type: "bit", nullable: false),
                    IsRejected = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityTerminationHistories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityTerminationHistories_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_ActivityTerminationHistories_Commitees_ToCommiteId",
                        column: x => x.ToCommiteId,
                        principalTable: "Commitees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ActivityTerminationHistories_Employees_ApprovedByDirectorId",
                        column: x => x.ApprovedByDirectorId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_ActivityTerminationHistories_Employees_FromEmployeeId",
                        column: x => x.FromEmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_ActivityTerminationHistories_Employees_ToEmployeeId",
                        column: x => x.ToEmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmployeesAssignedForActivities",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ActivityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeesAssignedForActivities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeesAssignedForActivities_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EmployeesAssignedForActivities_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TaskMemoReplies",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TaskMemoId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskMemoReplies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskMemoReplies_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_TaskMemoReplies_TaskMemos_TaskMemoId",
                        column: x => x.TaskMemoId,
                        principalTable: "TaskMemos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction   );
                });

            migrationBuilder.CreateTable(
                name: "ActivityProgresses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ActivityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ActualBudget = table.Column<float>(type: "real", nullable: false),
                    ActualWorked = table.Column<float>(type: "real", nullable: false),
                    EmployeeValueId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    QuarterId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FinanceDocumentPath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsApprovedByManager = table.Column<int>(type: "int", nullable: false),
                    IsApprovedByFinance = table.Column<int>(type: "int", nullable: false),
                    IsApprovedByDirector = table.Column<int>(type: "int", nullable: false),
                    FinanceApprovalRemark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CoordinatorApprovalRemark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DirectorApprovalRemark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Lat = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Lng = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    progressStatus = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityProgresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityProgresses_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_ActivityProgresses_ActivityTargetDivisions_QuarterId",
                        column: x => x.QuarterId,
                        principalTable: "ActivityTargetDivisions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction    );
                    table.ForeignKey(
                        name: "FK_ActivityProgresses_Employees_EmployeeValueId",
                        column: x => x.EmployeeValueId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction    );
                });

            migrationBuilder.CreateTable(
                name: "ProgressAttachments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ActivityProgressId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FilePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProgressAttachments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProgressAttachments_ActivityProgresses_ActivityProgressId",
                        column: x => x.ActivityProgressId,
                        principalTable: "ActivityProgresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Activities_ActivityParentId",
                table: "Activities",
                column: "ActivityParentId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_CommiteeId",
                table: "Activities",
                column: "CommiteeId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_EmployeeId",
                table: "Activities",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_PlanId",
                table: "Activities",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_TaskId",
                table: "Activities",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_UnitOfMeasurementId",
                table: "Activities",
                column: "UnitOfMeasurementId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityParents_TaskId",
                table: "ActivityParents",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityProgresses_ActivityId",
                table: "ActivityProgresses",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityProgresses_EmployeeValueId",
                table: "ActivityProgresses",
                column: "EmployeeValueId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityProgresses_QuarterId",
                table: "ActivityProgresses",
                column: "QuarterId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTargetDivisions_ActivityId",
                table: "ActivityTargetDivisions",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTerminationHistories_ActivityId",
                table: "ActivityTerminationHistories",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTerminationHistories_ApprovedByDirectorId",
                table: "ActivityTerminationHistories",
                column: "ApprovedByDirectorId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTerminationHistories_FromEmployeeId",
                table: "ActivityTerminationHistories",
                column: "FromEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTerminationHistories_ToCommiteId",
                table: "ActivityTerminationHistories",
                column: "ToCommiteId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTerminationHistories_ToEmployeeId",
                table: "ActivityTerminationHistories",
                column: "ToEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Appointements_CaseId",
                table: "Appointements",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_Appointements_EmployeeId",
                table: "Appointements",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_AppointementWithCalender_CaseId",
                table: "AppointementWithCalender",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_AppointementWithCalender_EmployeeId",
                table: "AppointementWithCalender",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_BudgetYears_ProgramBudgetYearId",
                table: "BudgetYears",
                column: "ProgramBudgetYearId");

            migrationBuilder.CreateIndex(
                name: "IX_CaseAttachments_CaseId",
                table: "CaseAttachments",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_CaseHistories_CaseId",
                table: "CaseHistories",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_CaseHistories_CaseTypeId",
                table: "CaseHistories",
                column: "CaseTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_CaseHistories_ForwardedById",
                table: "CaseHistories",
                column: "ForwardedById");

            migrationBuilder.CreateIndex(
                name: "IX_CaseHistories_FromEmployeeId",
                table: "CaseHistories",
                column: "FromEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_CaseHistories_FromStructureId",
                table: "CaseHistories",
                column: "FromStructureId");

            migrationBuilder.CreateIndex(
                name: "IX_CaseHistories_SecreteryId",
                table: "CaseHistories",
                column: "SecreteryId");

            migrationBuilder.CreateIndex(
                name: "IX_CaseHistories_ToEmployeeId",
                table: "CaseHistories",
                column: "ToEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_CaseHistories_ToStructureId",
                table: "CaseHistories",
                column: "ToStructureId");

            migrationBuilder.CreateIndex(
                name: "IX_CaseHistoryAttachments_CaseHistoryId",
                table: "CaseHistoryAttachments",
                column: "CaseHistoryId");

            migrationBuilder.CreateIndex(
                name: "IX_CaseHistoryAttachments_CaseId",
                table: "CaseHistoryAttachments",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_CaseMessages_CaseId",
                table: "CaseMessages",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_Cases_ApplicantId",
                table: "Cases",
                column: "ApplicantId");

            migrationBuilder.CreateIndex(
                name: "IX_Cases_CaseTypeId",
                table: "Cases",
                column: "CaseTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Cases_EmployeeId",
                table: "Cases",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_CaseTypes_ParentCaseTypeId",
                table: "CaseTypes",
                column: "ParentCaseTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_CommiteEmployees_CommiteeId",
                table: "CommiteEmployees",
                column: "CommiteeId");

            migrationBuilder.CreateIndex(
                name: "IX_CommiteEmployees_EmployeeId",
                table: "CommiteEmployees",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_OrganizationalStructureId",
                table: "Employees",
                column: "OrganizationalStructureId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeesAssignedForActivities_ActivityId",
                table: "EmployeesAssignedForActivities",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeesAssignedForActivities_EmployeeId",
                table: "EmployeesAssignedForActivities",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_FileSettings_CaseTypeId",
                table: "FileSettings",
                column: "CaseTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_FilesInformations_CaseId",
                table: "FilesInformations",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_FilesInformations_FileSettingId",
                table: "FilesInformations",
                column: "FileSettingId");

            migrationBuilder.CreateIndex(
                name: "IX_FormDocuments_StandrizedFormId",
                table: "FormDocuments",
                column: "StandrizedFormId");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationalStructures_OrganizationBranchId",
                table: "OrganizationalStructures",
                column: "OrganizationBranchId");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationalStructures_ParentStructureId",
                table: "OrganizationalStructures",
                column: "ParentStructureId");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationBranches_OrganizationProfileId",
                table: "OrganizationBranches",
                column: "OrganizationProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_Plans_BudgetYearId",
                table: "Plans",
                column: "BudgetYearId");

            migrationBuilder.CreateIndex(
                name: "IX_Plans_FinanceId",
                table: "Plans",
                column: "FinanceId");

            migrationBuilder.CreateIndex(
                name: "IX_Plans_ProgramId",
                table: "Plans",
                column: "ProgramId");

            migrationBuilder.CreateIndex(
                name: "IX_Plans_ProjectManagerId",
                table: "Plans",
                column: "ProjectManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_Plans_StructureId",
                table: "Plans",
                column: "StructureId");

            migrationBuilder.CreateIndex(
                name: "IX_Programs_ProgramBudgetYearId",
                table: "Programs",
                column: "ProgramBudgetYearId");

            migrationBuilder.CreateIndex(
                name: "IX_ProgressAttachments_ActivityProgressId",
                table: "ProgressAttachments",
                column: "ActivityProgressId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskMembers_ActivityParentId",
                table: "TaskMembers",
                column: "ActivityParentId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskMembers_EmployeeId",
                table: "TaskMembers",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskMembers_PlanId",
                table: "TaskMembers",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskMembers_TaskId",
                table: "TaskMembers",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskMemoReplies_EmployeeId",
                table: "TaskMemoReplies",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskMemoReplies_TaskMemoId",
                table: "TaskMemoReplies",
                column: "TaskMemoId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskMemos_ActivityParentId",
                table: "TaskMemos",
                column: "ActivityParentId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskMemos_EmployeeId",
                table: "TaskMemos",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskMemos_PlanId",
                table: "TaskMemos",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskMemos_TaskId",
                table: "TaskMemos",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_PlanId",
                table: "Tasks",
                column: "PlanId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActivityTerminationHistories");

            migrationBuilder.DropTable(
                name: "Appointements");

            migrationBuilder.DropTable(
                name: "AppointementWithCalender");

            migrationBuilder.DropTable(
                name: "CaseAttachments");

            migrationBuilder.DropTable(
                name: "CaseHistoryAttachments");

            migrationBuilder.DropTable(
                name: "CaseMessages");

            migrationBuilder.DropTable(
                name: "CommiteEmployees");

            migrationBuilder.DropTable(
                name: "EmployeesAssignedForActivities");

            migrationBuilder.DropTable(
                name: "FilesInformations");

            migrationBuilder.DropTable(
                name: "FormDocuments");

            migrationBuilder.DropTable(
                name: "ProgressAttachments");

            migrationBuilder.DropTable(
                name: "TaskMembers");

            migrationBuilder.DropTable(
                name: "TaskMemoReplies");

            migrationBuilder.DropTable(
                name: "CaseHistories");

            migrationBuilder.DropTable(
                name: "FileSettings");

            migrationBuilder.DropTable(
                name: "StandrizedForms");

            migrationBuilder.DropTable(
                name: "ActivityProgresses");

            migrationBuilder.DropTable(
                name: "TaskMemos");

            migrationBuilder.DropTable(
                name: "Cases");

            migrationBuilder.DropTable(
                name: "ActivityTargetDivisions");

            migrationBuilder.DropTable(
                name: "Applicants");

            migrationBuilder.DropTable(
                name: "CaseTypes");

            migrationBuilder.DropTable(
                name: "Activities");

            migrationBuilder.DropTable(
                name: "ActivityParents");

            migrationBuilder.DropTable(
                name: "Commitees");

            migrationBuilder.DropTable(
                name: "UnitOfMeasurment");

            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DropTable(
                name: "Plans");

            migrationBuilder.DropTable(
                name: "BudgetYears");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Programs");

            migrationBuilder.DropTable(
                name: "OrganizationalStructures");

            migrationBuilder.DropTable(
                name: "ProgramBudgetYears");

            migrationBuilder.DropTable(
                name: "OrganizationBranches");

            migrationBuilder.DropTable(
                name: "OrganizationProfile");
        }
    }
}
