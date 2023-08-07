using Microsoft.EntityFrameworkCore;

namespace RestaurantAPI.Models
{
    public class RestaurantDbContext : DbContext
    {
        public RestaurantDbContext(DbContextOptions<RestaurantDbContext> options) : base(options)
        {

        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<FoodItem> FoodItems { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }

        public DbSet<OrderMaster> OrderMasters { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Define the relationship between OrderMaster and OrderDetail
            modelBuilder.Entity<OrderDetail>()
                .HasOne(od => od.OrderMaster)   // OrderDetail has one OrderMaster
                .WithMany(om => om.OrderDetails) // OrderMaster has many OrderDetails
                .HasForeignKey(od => od.OrderMasterId); // Use OrderMasterId as the foreign key

            // Other configurations...

            base.OnModelCreating(modelBuilder);
        }

    }
}

