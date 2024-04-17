namespace Library.Models;

public class BookModel
{
    public string Title { get; set; } // Название книги
    public int AuthorId { get; set; } // Идентификатор автора книги
    public int GenreId { get; set; } // Идентификатор жанра книги
}