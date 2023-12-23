using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMCaseManagemntAPI.Migrations.DB
{
    /// <inheritdoc />
    public partial class applicantmodification : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "SubsidiaryOrganizationId",
                table: "Applicants",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Applicants_SubsidiaryOrganizationId",
                table: "Applicants",
                column: "SubsidiaryOrganizationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Applicants_SubsidiaryOrganizations_SubsidiaryOrganizationId",
                table: "Applicants",
                column: "SubsidiaryOrganizationId",
                principalTable: "SubsidiaryOrganizations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applicants_SubsidiaryOrganizations_SubsidiaryOrganizationId",
                table: "Applicants");

            migrationBuilder.DropIndex(
                name: "IX_Applicants_SubsidiaryOrganizationId",
                table: "Applicants");

            migrationBuilder.DropColumn(
                name: "SubsidiaryOrganizationId",
                table: "Applicants");
        }
    }
}
