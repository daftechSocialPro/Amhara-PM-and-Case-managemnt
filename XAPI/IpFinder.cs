using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.ServiceModel.Channels;
using System.Web;


namespace XAPI
{
    public class IpFinder
    {
        public static string GetIpAddress()
        {
            string clientAddress = HttpContext.Current.Request.UserHostAddress;
            return clientAddress;
        }
    }
}
