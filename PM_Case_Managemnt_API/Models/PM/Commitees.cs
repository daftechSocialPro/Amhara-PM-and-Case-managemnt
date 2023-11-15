

using PM_Case_Managemnt_API.Models.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace PM_Case_Managemnt_API.Models.PM
{
    public class Commitees : CommonModel
    {
        public Commitees()
        {
            Employees = new HashSet<CommitesEmployees>();
        }
        public string CommiteeName { get; set; } = null!;

        
        public virtual ICollection<CommitesEmployees> Employees { get; set; }

    }
}
