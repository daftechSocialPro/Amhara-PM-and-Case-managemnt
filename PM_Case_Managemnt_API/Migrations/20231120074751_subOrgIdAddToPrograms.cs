using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMCaseManagemntAPI.Migrations.DB
{
    /// <inheritdoc />
    public partial class subOrgIdAddToPrograms : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "SubsidiaryOrganizationId",
                table: "Programs",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Programs_SubsidiaryOrganizationId",
                table: "Programs",
                column: "SubsidiaryOrganizationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Programs_SubsidiaryOrganizations_SubsidiaryOrganizationId",
                table: "Programs",
                column: "SubsidiaryOrganizationId",
                principalTable: "SubsidiaryOrganizations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Programs_SubsidiaryOrganizations_SubsidiaryOrganizationId",
                table: "Programs");

            migrationBuilder.DropIndex(
                name: "IX_Programs_SubsidiaryOrganizationId",
                table: "Programs");

            migrationBuilder.DropColumn(
                name: "SubsidiaryOrganizationId",
                table: "Programs");
        }
    }
}
