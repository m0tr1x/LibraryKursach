using Library.Models;
using Microsoft.EntityFrameworkCore;

namespace Library.Services;

/// <summary>
/// Сервис для работников
/// </summary>
public class WorkerService
{
    private readonly AppDbContext _context;
    
    public WorkerService(AppDbContext context) {_context = context;}
    
    
    /// <summary>
    /// Метод для добавления жанра
    /// </summary>
    /// <param name="genreName"></param>
    /// <returns></returns>
    public async Task<bool> AddGenre(string genreName)
    {
        // Проверяем, существует ли уже жанр с таким названием
        if (await _context.Genres.AnyAsync(g => g.Name == genreName))
        {
            return false; // Жанр с таким названием уже существует
        }

        var newGenre = new Genre { Name = genreName };
        _context.Genres.Add(newGenre);
        await _context.SaveChangesAsync();

        return true; // Жанр успешно добавлен
    }

    /// <summary>
    /// метод для добавления нового автора
    /// </summary>
    /// <param name="authorName"></param>
    /// <returns></returns>
    public async Task<bool> AddAuthor(string authorName)
    {
        // Проверяем, существует ли уже автор с таким именем
        if (await _context.Authors.AnyAsync(a => a.Name == authorName))
        {
            return false; // Автор с таким именем уже существует
        }

        var newAuthor = new Author { Name = authorName };
        _context.Authors.Add(newAuthor);
        await _context.SaveChangesAsync();

        return true; // Автор успешно добавлен
    }
    
    
    /// <summary>
    /// метод для добавления новой книги
    /// </summary>
    /// <param name="title"></param>
    /// <param name="authorId"></param>
    /// <param name="genreId"></param>
    /// <returns></returns>
    public async Task<bool> AddBookAsync(BookModel model)
    {
        var authorId = _context.Authors
            .Where(a => a.Name == model.Author)
            .Select(a => a.Id)
            .FirstOrDefault();

        var genreId = _context.Genres
            .Where(g => g.Name == model.Genre)
            .Select(g => g.Id)
            .FirstOrDefault();
        // Проверяем, существует ли книга с таким названием
        if (await _context.Books.AnyAsync(b => b.Title == model.Title)) throw new Exception("Книга с таким названием уже существует");

        // Проверяем, существует ли автор с указанным идентификатором
        if(authorId == 0) throw new Exception("Автор не найден");

        if( genreId == 0) throw new Exception("Жанр не найден");

        // Создаем новую книгу
        var newBook = new Book
        {
            Title = model.Title,
            AuthorId = authorId,
            GenreId = genreId,
            IsAvailable = true // Новая книга доступна
        };

        // Добавляем книгу в контекст данных
        _context.Books.Add(newBook);

        // Сохраняем изменения в базе данных
        await _context.SaveChangesAsync();

        return true; // Книга успешно добавлена
    }


}