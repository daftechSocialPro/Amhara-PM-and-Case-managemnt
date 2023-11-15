using Microsoft.EntityFrameworkCore;

namespace PM_Case_Managemnt_API.Models.Common
{
    [Index(nameof(ShelfNumber), IsUnique = true)]
    public class Shelf :CommonModel
    {
        public string ShelfNumber { get; set; } = null!;
    }
}
