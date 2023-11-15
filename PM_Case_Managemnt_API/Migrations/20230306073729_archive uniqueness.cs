using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMCaseManagemntAPI.Migrations.DB
{
    /// <inheritdoc />
    public partial class archiveuniqueness : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ShelfNumber",
                table: "Shelf",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "RowNumber",
                table: "Rows",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "FolderName",
                table: "Folder",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Shelf_ShelfNumber",
                table: "Shelf",
                column: "ShelfNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rows_RowNumber_ShelfId",
                table: "Rows",
                columns: new[] { "RowNumber", "ShelfId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Folder_FolderName_RowId",
                table: "Folder",
                columns: new[] { "FolderName", "RowId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Shelf_ShelfNumber",
                table: "Shelf");

            migrationBuilder.DropIndex(
                name: "IX_Rows_RowNumber_ShelfId",
                table: "Rows");

            migrationBuilder.DropIndex(
                name: "IX_Folder_FolderName_RowId",
                table: "Folder");

            migrationBuilder.AlterColumn<string>(
                name: "ShelfNumber",
                table: "Shelf",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "RowNumber",
                table: "Rows",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "FolderName",
                table: "Folder",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
