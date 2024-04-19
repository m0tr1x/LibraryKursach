using System.Text.Json.Serialization;

namespace Library.Models;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
    public Role UserRole { get; set; }
    
    [JsonIgnore]
    public ICollection<Book> Books { get; set; }
    [JsonIgnore]
    public  ICollection<RentalOperation> RentalOperations { get; set; }
}