using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GsmComm.GsmCommunication;
using Infrastructure.Modelss.Project;

namespace Infrastructure.Modelss.Messaging
{
    public class Inbox:WithIdModel
    {
        public string Number { get; set; }
        public string Note { get; set; }
        public string Date { get; set; }
        public string MessageStatus { get; set; }
    }

  
}
