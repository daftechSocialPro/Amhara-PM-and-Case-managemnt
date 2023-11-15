using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace PM_Case_Managemnt_API.Models.Messaging
{
    public class Comment : Common
    {

        public string Content { get; set; }

        public string Sender { get; set; }
    }
}
