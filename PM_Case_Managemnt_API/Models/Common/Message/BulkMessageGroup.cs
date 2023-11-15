using PM_Case_Managemnt_API.Models.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace PM_Case_Managemnt_API.Models.Messaging
{
    public class BulkMessageGroup : Common
    {
        public string GroupName { get; set; }
    
        public string GroupCode { get; set; }
    
        

    }
}
