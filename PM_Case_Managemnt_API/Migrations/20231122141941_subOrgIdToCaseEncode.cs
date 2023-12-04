using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMCaseManagemntAPI.Migrations.DB
{
    /// <inheritdoc />
    public partial class subOrgIdToCaseEncode : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "SubsidiaryOrganizationId",
                table: "Commitees",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "SubsidiaryOrganizationId",
                table: "Cases",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Commitees_SubsidiaryOrganizationId",
                table: "Commitees",
                column: "SubsidiaryOrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_Cases_SubsidiaryOrganizationId",
                table: "Cases",
                column: "SubsidiaryOrganizationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cases_SubsidiaryOrganizations_SubsidiaryOrganizationId",
                table: "Cases",
                column: "SubsidiaryOrganizationId",
                principalTable: "SubsidiaryOrganizations",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Commitees_SubsidiaryOrganizations_SubsidiaryOrganizationId",
                table: "Commitees",
                column: "SubsidiaryOrganizationId",
                principalTable: "SubsidiaryOrganizations",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cases_SubsidiaryOrganizations_SubsidiaryOrganizationId",
                table: "Cases");

            migrationBuilder.DropForeignKey(
                name: "FK_Commitees_SubsidiaryOrganizations_SubsidiaryOrganizationId",
                table: "Commitees");

            migrationBuilder.DropIndex(
                name: "IX_Commitees_SubsidiaryOrganizationId",
                table: "Commitees");

            migrationBuilder.DropIndex(
                name: "IX_Cases_SubsidiaryOrganizationId",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "SubsidiaryOrganizationId",
                table: "Commitees");

            migrationBuilder.DropColumn(
                name: "SubsidiaryOrganizationId",
                table: "Cases");
        }
    }
}
