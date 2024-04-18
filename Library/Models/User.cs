namespace Library.Models;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
    public Role UserRole { get; set; }
    
    public ICollection<Book> Books { get; set; }
    public  ICollection<RentalOperation> RentalOperations { get; set; }
}