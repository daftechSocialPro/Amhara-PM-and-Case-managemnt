using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.Localization;
using Infrastructure.Modelss.Project;

namespace Infrastructure.Modelss.Messaging
{
    public class GroupPhones : WithIdModel
    {
        [Required]
        [Display(ResourceType = typeof(Resource), Name = "FullName")]
        public string FullName { get; set; }
        [Required]
        [StringLength(12)]
        [Display(ResourceType = typeof(Resource), Name = "Employee_PhoneNumber_PhoneNumber")]
        public string PhoneNumber { get; set; }
        [Required]
        [Display(ResourceType = typeof(Resource), Name = "Group")]
        public Guid GroupId { get; set; }
        public virtual BulkMessageGroup Group { get; set; }
    }
}
