using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Company_API.Data
{
    public partial class companyContext : DbContext
    {
        public companyContext()
        {
        }

        public companyContext(DbContextOptions<companyContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Company> Companies { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Company>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AddressCity)
                    .HasMaxLength(255)
                    .HasColumnName("addressCity");

                entity.Property(e => e.AddressCountry)
                    .HasMaxLength(255)
                    .HasColumnName("addressCountry");

                entity.Property(e => e.AddressLine1)
                    .HasMaxLength(255)
                    .HasColumnName("addressLine1");

                entity.Property(e => e.AddressLine2)
                    .HasMaxLength(255)
                    .HasColumnName("addressLine2");

                entity.Property(e => e.AddressState)
                    .HasMaxLength(255)
                    .HasColumnName("addressState");

                entity.Property(e => e.AnnualRevenue)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("annualRevenue");

                entity.Property(e => e.CompanyName)
                    .HasMaxLength(255)
                    .HasColumnName("companyName");

                entity.Property(e => e.DateAdded)
                    .HasColumnType("date")
                    .HasColumnName("dateAdded");

                entity.Property(e => e.Industry)
                    .HasMaxLength(255)
                    .HasColumnName("industry");

                entity.Property(e => e.PrimaryContact)
                    .HasMaxLength(255)
                    .HasColumnName("primaryContact");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
