using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PM_Case_Managemnt_API.DTOS.Common.Organization;
using PM_Case_Managemnt_API.Services.Common.Address;

namespace PM_Case_Managemnt_API.Controllers.Common.Organization
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly IAddressService _addressService;

        public AddressController(IAddressService addressService)
        {
            _addressService = addressService;
        }

        // ----------- Zone Endpoints -----------

        [HttpPost("zone")]
        public async Task<IActionResult> CreateZone([FromBody] ZonePostDto zoneDto)
        {
            var result = await _addressService.CreateZone(zoneDto);
            if (result > 0) return Ok(new { Message = "Zone created successfully!" });
            return BadRequest("Failed to create zone.");
        }

        [HttpPut("zone")]
        public async Task<IActionResult> UpdateZone([FromBody] ZonePutDto zoneDto)
        {
            var result = await _addressService.UpdateZone(zoneDto);
            if (result > 0) return Ok(new { Message = "Zone updated successfully!" });
            return NotFound("Zone not found.");
        }

        [HttpDelete("zone/{zoneId}")]
        public async Task<IActionResult> DeleteZone(Guid zoneId)
        {
            var result = await _addressService.DeleteZone(zoneId);
            if (result > 0) return Ok(new { Message = "Zone deleted successfully!" });
            return NotFound("Zone not found.");
        }

        [HttpGet("zones")]
        public async Task<IActionResult> GetZones()
        {
            var zones = await _addressService.GetZones();
            return Ok(zones);
        }

        [HttpGet("zone/{zoneId}")]
        public async Task<IActionResult> GetZoneById(Guid zoneId)
        {
            var zone = await _addressService.GetZoneById(zoneId);
            if (zone != null) return Ok(zone);
            return NotFound("Zone not found.");
        }

        // ----------- Woreda Endpoints -----------

        [HttpPost("woreda")]
        public async Task<IActionResult> CreateWoreda([FromBody] WoredaPostDto woredaDto)
        {
            var result = await _addressService.CreateWoreda(woredaDto);
            if (result > 0) return Ok(new { Message = "Woreda created successfully!" });
            return BadRequest("Failed to create woreda.");
        }

        [HttpPut("woreda")]
        public async Task<IActionResult> UpdateWoreda([FromBody] WoredaPutDto woredaDto)
        {
            var result = await _addressService.UpdateWoreda(woredaDto);
            if (result > 0) return Ok(new { Message = "Woreda updated successfully!" });
            return NotFound("Woreda not found.");
        }

        [HttpDelete("woreda/{woredaId}")]
        public async Task<IActionResult> DeleteWoreda(Guid woredaId)
        {
            var result = await _addressService.DeleteWoreda(woredaId);
            if (result > 0) return Ok(new { Message = "Woreda deleted successfully!" });
            return NotFound("Woreda not found.");
        }

        [HttpGet("woredas")]
        public async Task<IActionResult> GetWoredas()
        {
            var woredas = await _addressService.GetWoredas();
            return Ok(woredas);
        }

        [HttpGet("woreda/{woredaId}")]
        public async Task<IActionResult> GetWoredaById(Guid woredaId)
        {
            var woreda = await _addressService.GetWoredaById(woredaId);
            if (woreda != null) return Ok(woreda);
            return NotFound("Woreda not found.");
        }

        // ----------- Kebele Endpoints -----------

        [HttpPost("kebele")]
        public async Task<IActionResult> CreateKebele([FromBody] KebelePostDto kebeleDto)
        {
            var result = await _addressService.CreateKebele(kebeleDto);
            if (result > 0) return Ok(new { Message = "Kebele created successfully!" });
            return BadRequest("Failed to create kebele.");
        }

        [HttpPut("kebele")]
        public async Task<IActionResult> UpdateKebele([FromBody] KebelePutDto kebeleDto)
        {
            var result = await _addressService.UpdateKebele(kebeleDto);
            if (result > 0) return Ok(new { Message = "Kebele updated successfully!" });
            return NotFound("Kebele not found.");
        }

        [HttpDelete("kebele/{kebeleId}")]
        public async Task<IActionResult> DeleteKebele(Guid kebeleId)
        {
            var result = await _addressService.DeleteKebele(kebeleId);
            if (result > 0) return Ok(new { Message = "Kebele deleted successfully!" });
            return NotFound("Kebele not found.");
        }

        [HttpGet("kebeles")]
        public async Task<IActionResult> GetKebeles()
        {
            var kebeles = await _addressService.GetKebeles();
            return Ok(kebeles);
        }

        [HttpGet("kebele/{kebeleId}")]
        public async Task<IActionResult> GetKebeleById(Guid kebeleId)
        {
            var kebele = await _addressService.GetKebeleById(kebeleId);
            if (kebele != null) return Ok(kebele);
            return NotFound("Kebele not found.");
        }
    }
}
