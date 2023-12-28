using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMCaseManagemntAPI.Migrations.DB
{
    /// <inheritdoc />
    public partial class modifyArchiveAndUnitofMesurment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "SubsidiaryOrganizationId",
                table: "UnitOfMeasurment",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "SubsidiaryOrganizationId",
                table: "Shelf",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_UnitOfMeasurment_SubsidiaryOrganizationId",
                table: "UnitOfMeasurment",
                column: "SubsidiaryOrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_Shelf_SubsidiaryOrganizationId",
                table: "Shelf",
                column: "SubsidiaryOrganizationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Shelf_SubsidiaryOrganizations_SubsidiaryOrganizationId",
                table: "Shelf",
                column: "SubsidiaryOrganizationId",
                principalTable: "SubsidiaryOrganizations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Shelf_SubsidiaryOrganizations_SubsidiaryOrganizationId",
                table: "Shelf");

            migrationBuilder.DropForeignKey(
                name: "FK_UnitOfMeasurment_SubsidiaryOrganizations_SubsidiaryOrganizationId",
                table: "UnitOfMeasurment");

            migrationBuilder.DropIndex(
                name: "IX_UnitOfMeasurment_SubsidiaryOrganizationId",
                table: "UnitOfMeasurment");

            migrationBuilder.DropIndex(
                name: "IX_Shelf_SubsidiaryOrganizationId",
                table: "Shelf");

            migrationBuilder.DropColumn(
                name: "SubsidiaryOrganizationId",
                table: "UnitOfMeasurment");

            migrationBuilder.DropColumn(
                name: "SubsidiaryOrganizationId",
                table: "Shelf");
        }
    }
}
