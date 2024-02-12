using Company_API.Data;
using Company_API.Dto;
using Microsoft.EntityFrameworkCore;

namespace Company_API.Service
{
    public class Service : IService
    {
        private readonly companyContext _dbContext;

        public Service(companyContext dbContext)
        {
            _dbContext = dbContext;
        }
        public List<Company> GetAllCompanies()
        {
            try
            {
                var data = _dbContext.Companies.ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception("Error retrieving companies from the database.", ex);
            }
        }
        public bool DeleteCompany(int id)
        {
            try
            {
                var companyExist = GetCompanyById(id);
                if (companyExist != null)
                {
                    _dbContext.Companies.Remove(companyExist);
                    _dbContext.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error deleting company with ID {id} from the database.", ex);
            }
        }

        public Company CreateCompany(CompanyDto company)
        {
            try
            {
                var data = new Company
                {
                    CompanyName = company.CompanyName,
                    Industry = company.Industry,
                    PrimaryContact = company.PrimaryContact,
                    AddressLine1 = company.AddressLine1,
                    AddressLine2 = company.AddressLine2,
                    AddressState = company.AddressState,
                    AddressCity = company.AddressCity,
                    AddressCountry = company.AddressCountry,
                    AnnualRevenue = company.AnnualRevenue,
                    DateAdded = DateTime.Now
                };
                _dbContext.Companies.Add(data);
                _dbContext.SaveChanges();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception("Error creating company in the database.", ex);
            }
        }

        public bool UpdateCompany(int id, CompanyDto company)
        {
            try
            {
                var existingCompany = GetCompanyById(id);
                if (existingCompany == null)
                    return false;

                existingCompany.CompanyName = company.CompanyName;
                existingCompany.Industry = company.Industry;
                existingCompany.PrimaryContact = company.PrimaryContact;
                existingCompany.AddressLine1 = company.AddressLine1;
                existingCompany.AddressLine2 = company.AddressLine2 == string.Empty || company.AddressLine2 == null? null : company.AddressLine2;
                existingCompany.AddressState = company.AddressState;
                existingCompany.AddressCity = company.AddressCity;
                existingCompany.AddressCountry = company.AddressCountry;
                existingCompany.AnnualRevenue = company.AnnualRevenue;
                existingCompany.DateAdded = DateTime.Now;

                _dbContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating company with ID {id} in the database.", ex);
            }
        }

        public Company GetCompanyById(int id)
        {
            try
            {
                var result = _dbContext.Companies.FirstOrDefault(c => c.Id == id);
                if (result != null)
                {
                    return result;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving company with ID {id} from the database.", ex);
            }
        }
    }
}
