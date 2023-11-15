using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMCaseManagemntAPI.Migrations.DB
{
    /// <inheritdoc />
    public partial class branchUpdate2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrganizationalStructures_OrganizationBranches_OrganizationBranchId",
                table: "OrganizationalStructures");

            //migrationBuilder.AlterColumn<Guid>(
            //    name: "OrganizationBranchId",
            //    table: "OrganizationalStructures",
            //    type: "uniqueidentifier",
            //    nullable: false,
            //    defaultValue: new Guid("e9a7acb3-e8ec-426b-9152-81d480a1aeb4"),
            //    oldClrType: typeof(Guid),
            //    oldType: "uniqueidentifier",
            //    oldNullable: true);

         
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrganizationalStructures_OrganizationBranches_OrganizationBranchId",
                table: "OrganizationalStructures");

            migrationBuilder.AlterColumn<Guid>(
                name: "OrganizationBranchId",
                table: "OrganizationalStructures",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_OrganizationalStructures_OrganizationBranches_OrganizationBranchId",
                table: "OrganizationalStructures",
                column: "OrganizationBranchId",
                principalTable: "OrganizationBranches",
                principalColumn: "Id");
        }
    }
}
