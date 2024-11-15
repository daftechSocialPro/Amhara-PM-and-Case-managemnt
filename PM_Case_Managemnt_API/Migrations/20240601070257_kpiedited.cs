using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMCaseManagemntAPI.Migrations.DB
{
    /// <inheritdoc />
    public partial class kpiedited : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "KPIDetails",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<bool>(
                name: "HasKpiGoal",
                table: "Activities",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "KpiGoalId",
                table: "Activities",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Activities_KpiGoalId",
                table: "Activities",
                column: "KpiGoalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_KPIDetails_KpiGoalId",
                table: "Activities",
                column: "KpiGoalId",
                principalTable: "KPIDetails",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_KPIDetails_KpiGoalId",
                table: "Activities");

            migrationBuilder.DropIndex(
                name: "IX_Activities_KpiGoalId",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "HasKpiGoal",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "KpiGoalId",
                table: "Activities");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "KPIDetails",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
