using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : IdentityDbContext<User>
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Basket> Basket { get; set; }

        // this class is from DbContext class 
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // adding data into database 
            builder.Entity<IdentityRole>()
                   .HasData(
                      new IdentityRole { Name = "Member", NormalizedName = "MEMBER" },
                      new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" }
                   );
        }
    }
}