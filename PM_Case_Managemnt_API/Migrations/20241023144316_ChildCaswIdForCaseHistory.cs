using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMCaseManagemntAPI.Migrations.DB
{
    /// <inheritdoc />
    public partial class ChildCaswIdForCaseHistory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ChildCaseTypeId",
                table: "CaseHistories",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CaseHistories_ChildCaseTypeId",
                table: "CaseHistories",
                column: "ChildCaseTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_CaseHistories_CaseTypes_ChildCaseTypeId",
                table: "CaseHistories",
                column: "ChildCaseTypeId",
                principalTable: "CaseTypes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CaseHistories_CaseTypes_ChildCaseTypeId",
                table: "CaseHistories");

            migrationBuilder.DropIndex(
                name: "IX_CaseHistories_ChildCaseTypeId",
                table: "CaseHistories");

            migrationBuilder.DropColumn(
                name: "ChildCaseTypeId",
                table: "CaseHistories");
        }
    }
}
