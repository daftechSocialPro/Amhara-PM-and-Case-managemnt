using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMCaseManagemntAPI.Migrations.DB
{
    /// <inheritdoc />
    public partial class caseHistoryAttachmentToCaseAttachment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CaseHistoryAttachments_Cases_CaseId",
                table: "CaseHistoryAttachments");

            migrationBuilder.DropIndex(
                name: "IX_CaseHistoryAttachments_CaseId",
                table: "CaseHistoryAttachments");

            migrationBuilder.DropColumn(
                name: "CaseId",
                table: "CaseHistoryAttachments");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CaseId",
                table: "CaseHistoryAttachments",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CaseHistoryAttachments_CaseId",
                table: "CaseHistoryAttachments",
                column: "CaseId");

            migrationBuilder.AddForeignKey(
                name: "FK_CaseHistoryAttachments_Cases_CaseId",
                table: "CaseHistoryAttachments",
                column: "CaseId",
                principalTable: "Cases",
                principalColumn: "Id");
        }
    }
}
