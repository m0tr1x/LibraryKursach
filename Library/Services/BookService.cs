using Library.Models;
using Microsoft.EntityFrameworkCore;

namespace Library.Services;

/// <summary>
/// Сервис для работы с книгами
/// </summary>
public class BookService
{
    private readonly AppDbContext _context;

    public BookService(AppDbContext context)
    {
        _context = context;
    }
    /// <summary>
    /// Метод для получения всех книг
    /// </summary>
    /// <returns></returns>
    public async Task<List<Book>> GetAllBooks()
    {
        return await _context.Books.ToListAsync();
    }

    /// <summary>
    /// Метод для получения всех доступных книг
    /// </summary>
    /// <returns></returns>
    public async Task<List<Book>> GetAvailableBooks()
    {
        return await _context.Books.Where(b => b.IsAvailable)
            .Include(b => b.Author) // Включаем данные об авторе книги
            .Include(b => b.Genre) // Включаем данные о жанре книги
            .ToListAsync();
    }


    /// <summary>
    /// Метод для взятия книги
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="bookId"></param>
    /// <returns></returns>
    public async Task<bool> TakeBook(int userId, int bookId)
    {
        try
        {
            var book = await _context.Books.FindAsync(bookId);


            if (book == null || !book.IsAvailable)
            {
                return false; // Книга не найдена или недоступна
            }
            
            

            // Обновляем состояние книги
            book.IsAvailable = false;
            book.UserId = userId;
            _context.Books.Update(book);
            await _context.SaveChangesAsync();
            return true; // Книга успешно взята пользователем
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            return false; // Обработка ошибки
        }
    }

    /// <summary>
    /// Метод для возврата книги
    /// </summary>
    /// <param name="bookId"></param>
    /// <param name="userId"></param>
    /// <returns></returns>
    public async Task<bool> ReturnBook(int bookId, int userId)
    {
        var book = await _context.Books.FindAsync(bookId);
        if (book == null || book.IsAvailable || book.UserId != userId)
        {
            return false; // Книга не найдена, уже доступна или не была взята этим пользователем
        }

        // Обновляем состояние книги
        book.IsAvailable = true;
        book.UserId = null;
        _context.Books.Update(book);
        await _context.SaveChangesAsync();
        return true; // Книга успешно возвращена в библиотеку
    }
    
    
    /// <summary>
    /// Метод для редактирования книги
    /// </summary>
    /// <param name="bookId"></param>
    /// <param name="updatedBook"></param>
    /// <returns></returns>
    public async Task<bool> EditBookAsync(int bookId, BookModel updatedBook)
    {
        var existingBook = await _context.Books.FindAsync(bookId);
        if (existingBook == null)
        {
            return false; // Книга не найдена
        }

        // Обновляем данные книги
        existingBook.Title = updatedBook.Title;
        existingBook.AuthorId = updatedBook.AuthorId;
        existingBook.GenreId = updatedBook.GenreId;

        // Сохраняем изменения в базе данных
        _context.Books.Update(existingBook);
        await _context.SaveChangesAsync();

        return true; // Книга успешно обновлена
    }

    /// <summary>
    /// Метод для удаления книги
    /// </summary>
    /// <param name="bookId"></param>
    /// <returns></returns>
    public async Task<bool> DeleteBook(int bookId)
    {
        var book = await _context.Books.FindAsync(bookId);
        if (book == null) throw new ArgumentException("Книга не найдена");
        _context.Books.Remove(book);
        await _context.SaveChangesAsync();
        return true;
    }

}