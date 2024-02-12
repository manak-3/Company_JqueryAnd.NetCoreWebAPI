using Company_API.Data;
using Company_API.Dto;
using Company_API.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Company_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        public IService _service { get; }
        public CompanyController(IService service) 
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var companies = _service.GetAllCompanies();
                if (companies == null || !companies.Any())
                {
                    return NotFound("No companies found.");
                }
                else
                {
                    return Ok(companies);
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving companies: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var companies = _service.GetCompanyById(id);
                if (companies == null)
                {
                    return NotFound("No companies found.");
                }
                else
                {
                    return Ok(companies);
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving companies: {ex.Message}");
            }
        }

        [HttpPost]
        public IActionResult Add([FromForm] CompanyDto company)
        {
            try
            {
                var createdCompany = _service.CreateCompany(company);
                if (createdCompany != null)
                {
                    return Ok(createdCompany);
                }
                return BadRequest("Error creating company.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error creating company: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromForm]  CompanyDto company)
        {
            try
            {

                var result = _service.UpdateCompany(id, company);
                if (result == false)
                {
                    return NotFound("Company Not Found");
                }
                else
                {
                    return Ok(true);
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error updating company: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var existingCompany = _service.DeleteCompany(id);
                if (existingCompany == false)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(true);
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error deleting company: {ex.Message}");
            }
        }
    }
}
