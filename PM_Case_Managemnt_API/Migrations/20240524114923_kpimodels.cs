using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMCaseManagemntAPI.Migrations.DB
{
    /// <inheritdoc />
    public partial class kpimodels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AccessCode",
                table: "KPIs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "HasSubsidiaryOrganization",
                table: "KPIs",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "SubsidiaryOrganizationId",
                table: "KPIs",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_KPIs_SubsidiaryOrganizationId",
                table: "KPIs",
                column: "SubsidiaryOrganizationId");

            migrationBuilder.AddForeignKey(
                name: "FK_KPIs_SubsidiaryOrganizations_SubsidiaryOrganizationId",
                table: "KPIs",
                column: "SubsidiaryOrganizationId",
                principalTable: "SubsidiaryOrganizations",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KPIs_SubsidiaryOrganizations_SubsidiaryOrganizationId",
                table: "KPIs");

            migrationBuilder.DropIndex(
                name: "IX_KPIs_SubsidiaryOrganizationId",
                table: "KPIs");

            migrationBuilder.DropColumn(
                name: "AccessCode",
                table: "KPIs");

            migrationBuilder.DropColumn(
                name: "HasSubsidiaryOrganization",
                table: "KPIs");

            migrationBuilder.DropColumn(
                name: "SubsidiaryOrganizationId",
                table: "KPIs");
        }
    }
}
