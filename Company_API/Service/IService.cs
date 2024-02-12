using Company_API.Data;
using Company_API.Dto;

namespace Company_API.Service
{
    public interface IService
    {
        List<Company> GetAllCompanies();
        Company CreateCompany(CompanyDto company);
        bool UpdateCompany(int id, CompanyDto company);
        bool DeleteCompany(int id);
        Company GetCompanyById(int id);
    }
}
