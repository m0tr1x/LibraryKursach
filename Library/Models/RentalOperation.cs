using System.ComponentModel.DataAnnotations.Schema;

namespace Library.Models;

public class RentalOperation
{
    public int Id { get; set; }
    [ForeignKey("User")]
    public int UserId { get; set; }
    [ForeignKey("Book")]
    public int BookId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    
    public  List<RentalOperation> RentalOperations { get; set; }
}