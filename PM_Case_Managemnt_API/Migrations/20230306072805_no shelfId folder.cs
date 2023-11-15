using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMCaseManagemntAPI.Migrations.DB
{
    /// <inheritdoc />
    public partial class noshelfIdfolder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Folder_Shelf_ShelfId",
                table: "Folder");

            migrationBuilder.DropIndex(
                name: "IX_Folder_ShelfId",
                table: "Folder");

            migrationBuilder.DropColumn(
                name: "ShelfId",
                table: "Folder");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ShelfId",
                table: "Folder",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Folder_ShelfId",
                table: "Folder",
                column: "ShelfId");

            migrationBuilder.AddForeignKey(
                name: "FK_Folder_Shelf_ShelfId",
                table: "Folder",
                column: "ShelfId",
                principalTable: "Shelf",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
