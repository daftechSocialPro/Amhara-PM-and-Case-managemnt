using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PM_Case_Managemnt_API.Models.Auth
{
    public class ApplicationSettings
    {
        public string JWT_Secret { get; set; }
        public string Client_URL { get; set; }
    }
}
