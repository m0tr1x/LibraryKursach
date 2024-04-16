using System.ComponentModel.DataAnnotations.Schema;

namespace Library.Models;

public class Book
{
    public int Id { get; set; }
    public string Title { get; set; }
    public bool IsAvailable { get; set; } // Признак доступности книги
    
    // Навигационное свойство для автора книги
    [ForeignKey("Author")]
    public int AuthorId { get; set; } // Внешний ключ для связи с автором
    public Author Author { get; set; } // Навигационное свойство к автору

    // Навигационное свойство для жанра книги
    [ForeignKey("Genre")]
    public int GenreId { get; set; } // Внешний ключ для связи с жанром
    public Genre Genre { get; set; } // Навигационное свойство к жанру

    [ForeignKey("User")]
    public int? UserId { get; set; } // Идентификатор пользователя, которому принадлежит книга
    public User User { get; set; } // Навигационное свойство для пользователя, которому принадлежит книга
}
   