using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PM_Case_Managemnt_API.DTOS.Case;
using PM_Case_Managemnt_API.Services.CaseMGMT.CaseMessagesService;

namespace PM_Case_Managemnt_API.Controllers.Case
{
    [Route("api/case/[Controller]")]
    [ApiController]
    public class CaseMessagesController : ControllerBase
    {
        private readonly ICaseMessagesService _caseMessagesService;

        public CaseMessagesController(ICaseMessagesService caseMessagesService)
        {
            _caseMessagesService = caseMessagesService;
        }

        [HttpGet]
        public async Task<IActionResult> GetMany(bool messageStatus= false)
        {
            try
            {
                return Ok(await _caseMessagesService.GetMany(messageStatus));
            } catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> SendUnsentMessages([FromBody] List<CaseUnsentMessagesGetDto> messages)
        {
            try
            {
                await _caseMessagesService.SemdMessages(messages);
                return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        

    }
}
