using System.ComponentModel.DataAnnotations.Schema;

namespace Library.Models;

public class Book
{
    public int Id { get; set; }
    public string Title { get; set; }
    [ForeignKey("Author")]
    public string Author { get; set; }
    [ForeignKey("Genre")]
    public string Genre { get; set; }
    public bool IsAvailable { get; set; }
}