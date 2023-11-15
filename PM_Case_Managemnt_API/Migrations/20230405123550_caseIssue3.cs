using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMCaseManagemntAPI.Migrations.DB
{
    /// <inheritdoc />
    public partial class caseIssue3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ForwardedToStructureId",
                table: "CaseIssues",
                newName: "ForwardedToEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_CaseIssues_AssignedByEmployeeId",
                table: "CaseIssues",
                column: "AssignedByEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_CaseIssues_AssignedToEmployeeId",
                table: "CaseIssues",
                column: "AssignedToEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_CaseIssues_AssignedToStructureId",
                table: "CaseIssues",
                column: "AssignedToStructureId");

            migrationBuilder.CreateIndex(
                name: "IX_CaseIssues_CaseId",
                table: "CaseIssues",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_CaseIssues_ForwardedToEmployeeId",
                table: "CaseIssues",
                column: "ForwardedToEmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_CaseIssues_Cases_CaseId",
                table: "CaseIssues",
                column: "CaseId",
                principalTable: "Cases",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CaseIssues_Employees_AssignedByEmployeeId",
                table: "CaseIssues",
                column: "AssignedByEmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CaseIssues_Employees_AssignedToEmployeeId",
                table: "CaseIssues",
                column: "AssignedToEmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CaseIssues_Employees_ForwardedToEmployeeId",
                table: "CaseIssues",
                column: "ForwardedToEmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CaseIssues_OrganizationalStructures_AssignedToStructureId",
                table: "CaseIssues",
                column: "AssignedToStructureId",
                principalTable: "OrganizationalStructures",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CaseIssues_Cases_CaseId",
                table: "CaseIssues");

            migrationBuilder.DropForeignKey(
                name: "FK_CaseIssues_Employees_AssignedByEmployeeId",
                table: "CaseIssues");

            migrationBuilder.DropForeignKey(
                name: "FK_CaseIssues_Employees_AssignedToEmployeeId",
                table: "CaseIssues");

            migrationBuilder.DropForeignKey(
                name: "FK_CaseIssues_Employees_ForwardedToEmployeeId",
                table: "CaseIssues");

            migrationBuilder.DropForeignKey(
                name: "FK_CaseIssues_OrganizationalStructures_AssignedToStructureId",
                table: "CaseIssues");

            migrationBuilder.DropIndex(
                name: "IX_CaseIssues_AssignedByEmployeeId",
                table: "CaseIssues");

            migrationBuilder.DropIndex(
                name: "IX_CaseIssues_AssignedToEmployeeId",
                table: "CaseIssues");

            migrationBuilder.DropIndex(
                name: "IX_CaseIssues_AssignedToStructureId",
                table: "CaseIssues");

            migrationBuilder.DropIndex(
                name: "IX_CaseIssues_CaseId",
                table: "CaseIssues");

            migrationBuilder.DropIndex(
                name: "IX_CaseIssues_ForwardedToEmployeeId",
                table: "CaseIssues");

            migrationBuilder.RenameColumn(
                name: "ForwardedToEmployeeId",
                table: "CaseIssues",
                newName: "ForwardedToStructureId");
        }
    }
}
