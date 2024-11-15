using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMCaseManagemntAPI.Migrations.DB
{
    /// <inheritdoc />
    public partial class commentChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "OrganizationalStructureId",
                table: "Shelf",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "OrganizationalStructureId",
                table: "CaseTypes",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Shelf_OrganizationalStructureId",
                table: "Shelf",
                column: "OrganizationalStructureId");

            migrationBuilder.CreateIndex(
                name: "IX_CaseTypes_OrganizationalStructureId",
                table: "CaseTypes",
                column: "OrganizationalStructureId");

            migrationBuilder.AddForeignKey(
                name: "FK_CaseTypes_OrganizationalStructures_OrganizationalStructureId",
                table: "CaseTypes",
                column: "OrganizationalStructureId",
                principalTable: "OrganizationalStructures",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Shelf_OrganizationalStructures_OrganizationalStructureId",
                table: "Shelf",
                column: "OrganizationalStructureId",
                principalTable: "OrganizationalStructures",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CaseTypes_OrganizationalStructures_OrganizationalStructureId",
                table: "CaseTypes");

            migrationBuilder.DropForeignKey(
                name: "FK_Shelf_OrganizationalStructures_OrganizationalStructureId",
                table: "Shelf");

            migrationBuilder.DropIndex(
                name: "IX_Shelf_OrganizationalStructureId",
                table: "Shelf");

            migrationBuilder.DropIndex(
                name: "IX_CaseTypes_OrganizationalStructureId",
                table: "CaseTypes");

            migrationBuilder.DropColumn(
                name: "OrganizationalStructureId",
                table: "Shelf");

            migrationBuilder.DropColumn(
                name: "OrganizationalStructureId",
                table: "CaseTypes");
        }
    }
}
