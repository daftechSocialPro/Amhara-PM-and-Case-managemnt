using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.Localization;
using Infrastructure.Modelss.Organization;
using Infrastructure.Modelss.Project;

namespace Infrastructure.Modelss.Messaging
{
    public class MessageSetting : WithIdModel
    {
        [Required]
        [Display(ResourceType = typeof(Resource), Name = "SettingType")]
        public SettingType SettingType { get; set; }
        [Display(ResourceType = typeof(Resource), Name = "ComPort")]
        public string ComPort { get; set; }
        [Display(ResourceType = typeof(Resource), Name = "BaudRate")]
        public int BaudRate { get; set; }
        [NotMapped ]
        [Display(ResourceType = typeof(Resource), Name = "SMSCode")]
        public string SMSCode { get; set; }
        public virtual OrganizationalStructure OrganizationalStructure { get; set; }
        public Guid OrganizationalStructureId { get; set; }
        public string IPAddress { get; set; }
    }

    public enum SettingType
    {
        API,
        DONGLE
    }
}
