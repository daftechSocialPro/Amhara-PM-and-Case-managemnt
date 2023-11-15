using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMCaseManagemntAPI.Migrations.DB
{
    /// <inheritdoc />
    public partial class folderId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "FolderId",
                table: "Cases",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Cases_FolderId",
                table: "Cases",
                column: "FolderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cases_Folder_FolderId",
                table: "Cases",
                column: "FolderId",
                principalTable: "Folder",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cases_Folder_FolderId",
                table: "Cases");

            migrationBuilder.DropIndex(
                name: "IX_Cases_FolderId",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "FolderId",
                table: "Cases");
        }
    }
}
