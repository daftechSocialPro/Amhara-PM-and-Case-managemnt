using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMCaseManagemntAPI.Migrations.DB
{
    /// <inheritdoc />
    public partial class branchUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<bool>(
                name: "IsBranch",
                table: "OrganizationalStructures",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "OfficeNumber",
                table: "OrganizationalStructures",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "OrganizationProfileId",
                table: "OrganizationalStructures",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("7014077c-ad28-439d-be1c-772dfd73b92a"));

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationalStructures_OrganizationProfileId",
                table: "OrganizationalStructures",
                column: "OrganizationProfileId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrganizationalStructures_OrganizationBranches_OrganizationBranchId",
                table: "OrganizationalStructures",
                column: "OrganizationBranchId",
                principalTable: "OrganizationBranches",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrganizationalStructures_OrganizationProfile_OrganizationProfileId",
                table: "OrganizationalStructures",
                column: "OrganizationProfileId",
                principalTable: "OrganizationProfile",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrganizationalStructures_OrganizationBranches_OrganizationBranchId",
                table: "OrganizationalStructures");

            migrationBuilder.DropForeignKey(
                name: "FK_OrganizationalStructures_OrganizationProfile_OrganizationProfileId",
                table: "OrganizationalStructures");

            migrationBuilder.DropIndex(
                name: "IX_OrganizationalStructures_OrganizationProfileId",
                table: "OrganizationalStructures");

            migrationBuilder.DropColumn(
                name: "IsBranch",
                table: "OrganizationalStructures");

            migrationBuilder.DropColumn(
                name: "OfficeNumber",
                table: "OrganizationalStructures");

            migrationBuilder.DropColumn(
                name: "OrganizationProfileId",
                table: "OrganizationalStructures");

            migrationBuilder.AlterColumn<Guid>(
                name: "OrganizationBranchId",
                table: "OrganizationalStructures",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_OrganizationalStructures_OrganizationBranches_OrganizationBranchId",
                table: "OrganizationalStructures",
                column: "OrganizationBranchId",
                principalTable: "OrganizationBranches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
