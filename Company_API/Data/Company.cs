using System;
using System.Collections.Generic;

namespace Company_API.Data
{
    public partial class Company
    {
        public int Id { get; set; }
        public string? CompanyName { get; set; }
        public string? Industry { get; set; }
        public string? PrimaryContact { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? AddressState { get; set; }
        public string? AddressCity { get; set; }
        public string? AddressCountry { get; set; }
        public decimal? AnnualRevenue { get; set; }
        public DateTime? DateAdded { get; set; }
    }
}
