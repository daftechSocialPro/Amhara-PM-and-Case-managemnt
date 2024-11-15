using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.Modelss.Project;

namespace Infrastructure.Modelss.Messaging
{
    public class UnSentMessage : WithIdModel
    {
        public Guid MessageId { get; set; }
        public Messages Message { get; set; }
        public string PhoneNumebr { get; set; }
    }
}
