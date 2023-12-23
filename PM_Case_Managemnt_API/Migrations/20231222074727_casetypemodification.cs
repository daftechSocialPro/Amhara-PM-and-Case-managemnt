using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMCaseManagemntAPI.Migrations.DB
{
    /// <inheritdoc />
    public partial class casetypemodification : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "SubsidiaryOrganizationId",
                table: "CaseTypes",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_CaseTypes_SubsidiaryOrganizationId",
                table: "CaseTypes",
                column: "SubsidiaryOrganizationId");

            migrationBuilder.AddForeignKey(
                name: "FK_CaseTypes_SubsidiaryOrganizations_SubsidiaryOrganizationId",
                table: "CaseTypes",
                column: "SubsidiaryOrganizationId",
                principalTable: "SubsidiaryOrganizations",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CaseTypes_SubsidiaryOrganizations_SubsidiaryOrganizationId",
                table: "CaseTypes");

            migrationBuilder.DropIndex(
                name: "IX_CaseTypes_SubsidiaryOrganizationId",
                table: "CaseTypes");

            migrationBuilder.DropColumn(
                name: "SubsidiaryOrganizationId",
                table: "CaseTypes");
        }
    }
}
