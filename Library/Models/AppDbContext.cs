using Microsoft.EntityFrameworkCore;

namespace Library.Models;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Book> Books { get; set; } = null!;
    public DbSet<RentalOperation> RentalOperations { get; set; } = null!;
    public DbSet<Author> Authors { get; set; } = null!;
    public DbSet<Genre> Genres { get; set; } = null!;
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=kursach;Username=mtrx;");
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("Biblioteque");
    }
}