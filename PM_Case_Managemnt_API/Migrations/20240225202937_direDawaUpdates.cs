using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMCaseManagemntAPI.Migrations.DB
{
    /// <inheritdoc />
    public partial class direDawaUpdates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Plans_Employees_FinanceId",
                table: "Plans");

            migrationBuilder.AlterColumn<Guid>(
                name: "FinanceId",
                table: "Plans",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<string>(
                name: "ProjectFunder",
                table: "Plans",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "CaseId",
                table: "ActivityProgresses",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AlterColumn<float>(
                name: "Weight",
                table: "ActivityParents",
                type: "real",
                nullable: false,
                defaultValue: 0f,
                oldClrType: typeof(float),
                oldType: "real",
                oldNullable: true);

            migrationBuilder.AlterColumn<float>(
                name: "Goal",
                table: "ActivityParents",
                type: "real",
                nullable: false,
                defaultValue: 0f,
                oldClrType: typeof(float),
                oldType: "real",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "AssignedToBranch",
                table: "ActivityParents",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<float>(
                name: "BaseLine",
                table: "ActivityParents",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<bool>(
                name: "IsClassfiedToBranch",
                table: "ActivityParents",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "UnitOfMeasurmentId",
                table: "ActivityParents",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "CaseTypeId",
                table: "Activities",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "OrganizationalStructureId",
                table: "Activities",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ActivityProgresses_CaseId",
                table: "ActivityProgresses",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityParents_UnitOfMeasurmentId",
                table: "ActivityParents",
                column: "UnitOfMeasurmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_CaseTypeId",
                table: "Activities",
                column: "CaseTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_OrganizationalStructureId",
                table: "Activities",
                column: "OrganizationalStructureId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_CaseTypes_CaseTypeId",
                table: "Activities",
                column: "CaseTypeId",
                principalTable: "CaseTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_OrganizationalStructures_OrganizationalStructureId",
                table: "Activities",
                column: "OrganizationalStructureId",
                principalTable: "OrganizationalStructures",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityParents_UnitOfMeasurment_UnitOfMeasurmentId",
                table: "ActivityParents",
                column: "UnitOfMeasurmentId",
                principalTable: "UnitOfMeasurment",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityProgresses_CaseHistories_CaseId",
                table: "ActivityProgresses",
                column: "CaseId",
                principalTable: "CaseHistories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Plans_Employees_FinanceId",
                table: "Plans",
                column: "FinanceId",
                principalTable: "Employees",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_CaseTypes_CaseTypeId",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_Activities_OrganizationalStructures_OrganizationalStructureId",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_ActivityParents_UnitOfMeasurment_UnitOfMeasurmentId",
                table: "ActivityParents");

            migrationBuilder.DropForeignKey(
                name: "FK_ActivityProgresses_CaseHistories_CaseId",
                table: "ActivityProgresses");

            migrationBuilder.DropForeignKey(
                name: "FK_Plans_Employees_FinanceId",
                table: "Plans");

            migrationBuilder.DropIndex(
                name: "IX_ActivityProgresses_CaseId",
                table: "ActivityProgresses");

            migrationBuilder.DropIndex(
                name: "IX_ActivityParents_UnitOfMeasurmentId",
                table: "ActivityParents");

            migrationBuilder.DropIndex(
                name: "IX_Activities_CaseTypeId",
                table: "Activities");

            migrationBuilder.DropIndex(
                name: "IX_Activities_OrganizationalStructureId",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "ProjectFunder",
                table: "Plans");

            migrationBuilder.DropColumn(
                name: "CaseId",
                table: "ActivityProgresses");

            migrationBuilder.DropColumn(
                name: "AssignedToBranch",
                table: "ActivityParents");

            migrationBuilder.DropColumn(
                name: "BaseLine",
                table: "ActivityParents");

            migrationBuilder.DropColumn(
                name: "IsClassfiedToBranch",
                table: "ActivityParents");

            migrationBuilder.DropColumn(
                name: "UnitOfMeasurmentId",
                table: "ActivityParents");

            migrationBuilder.DropColumn(
                name: "CaseTypeId",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "OrganizationalStructureId",
                table: "Activities");

            migrationBuilder.AlterColumn<Guid>(
                name: "FinanceId",
                table: "Plans",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<float>(
                name: "Weight",
                table: "ActivityParents",
                type: "real",
                nullable: true,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AlterColumn<float>(
                name: "Goal",
                table: "ActivityParents",
                type: "real",
                nullable: true,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AddForeignKey(
                name: "FK_Plans_Employees_FinanceId",
                table: "Plans",
                column: "FinanceId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
