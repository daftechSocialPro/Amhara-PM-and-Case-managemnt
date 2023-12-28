using Microsoft.EntityFrameworkCore;
using PM_Case_Managemnt_API.Models.Common.Organization;

namespace PM_Case_Managemnt_API.Models.Common
{
    [Index(nameof(ShelfNumber), IsUnique = true)]
    public class Shelf :CommonModel
    {
        public string ShelfNumber { get; set; } = null!;
        public Guid SubsidiaryOrganizationId { get; set; }
        public virtual SubsidiaryOrganization? SubsidiaryOrganization { get; set; }
    }
}
