using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Infrastructure.Localization;
using Infrastructure.Modelss.Project;

namespace Infrastructure.Modelss.Messaging
{
    public class Messages : WithIdModel
    {
      
        [Display(ResourceType = typeof(Resource), Name = "Group")]
        public Guid BulkMessageGroupId { get; set; }
        public virtual BulkMessageGroup BulkMessageGroup { get; set; }
        [Display(ResourceType = typeof(Resource), Name = "Message")]
        [StringLength(158)]
        [DataType(DataType.MultilineText)]
        public string Message { get; set; }
        [Display(ResourceType = typeof(Resource), Name = "Language")]
       
        public Language Language { get; set; }
        [Display(ResourceType = typeof(Resource), Name = "NumberOfCustomers")]
        public int NumberOfCustomers { get; set; }
        [Display(ResourceType = typeof(Resource), Name = "IsSent")]
        public bool IsSent { get; set; }
        [Display(ResourceType = typeof(Resource), Name = "SentTime")]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:MM/dd/yyyy}")]
        public DateTime? SentTime { get; set; }
        [NotMapped]
        [Display(ResourceType = typeof(Resource), Name = "Group")]
        public string[] GroupList { get; set; }
        [Display(ResourceType = typeof(Resource), Name = "CompanyName")]
        public string StructureName { get; set; }
        [Display(ResourceType = typeof(Resource), Name = "SentCount")]
        public int SentCount { get; set; }
        [Display(ResourceType = typeof(Resource), Name = "UnsentPhones")]
        public string UnsentPhones { get; set; }


    }

    public enum RecipantType
    {
        Single,
        Bulk
    }

    public enum Language
    {
        English,
        አማርኛ
    }
}
