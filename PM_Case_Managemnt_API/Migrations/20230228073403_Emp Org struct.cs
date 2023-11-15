using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMCaseManagemntAPI.Migrations.DB
{
    /// <inheritdoc />
    public partial class EmpOrgstruct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.AddColumn<Guid>(
            //    name: "OrganizationalStructureId",
            //    table: "Employees",
            //    type: "uniqueidentifier",
            //    nullable: false,
            //    defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            //migrationBuilder.CreateIndex(
            //    name: "IX_Employees_OrganizationalStructureId",
            //    table: "Employees",
            //    column: "OrganizationalStructureId");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Employees_OrganizationalStructures_OrganizationalStructureId",
            //    table: "Employees",
            //    column: "OrganizationalStructureId",
            //    principalTable: "OrganizationalStructures",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.NoAction);


        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_Employees_OrganizationalStructures_OrganizationalStructureId",
            //    table: "Employees");

            //migrationBuilder.DropIndex(
            //    name: "IX_Employees_OrganizationalStructureId",
            //    table: "Employees");

            //migrationBuilder.DropColumn(
            //    name: "OrganizationalStructureId",
            //    table: "Employees");
        }
    }
}
