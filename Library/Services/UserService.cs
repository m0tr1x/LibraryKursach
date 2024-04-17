using Library.Models;
using Microsoft.EntityFrameworkCore;

namespace Library.Services;


/// <summary>
/// Сервис для работы с пользователями
/// </summary>
public class UserService
{
    private readonly AppDbContext _context;

    public UserService(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Метод для получения всех пользователей
    /// </summary>
    /// <returns></returns>
    public async Task<List<User>> GetAllUsers()
    {
        return await _context.Users.ToListAsync();
    }
    
    /// <summary>
    /// Метод для получения пользователя по его емейлу
    /// </summary>
    /// <param name="email"></param>
    /// <returns></returns>
    public async Task<User> GetUserByEmail(string email)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
    }
    
    /// <summary>
    /// Метод для получения списка книг пользователя по его идентификатору
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    public async Task<List<Book>> GetUserBooksAsync(int userId)
    {
        // Используем LINQ для получения списка книг пользователя по его идентификатору
        var userBooks = await _context.Books
            .Where(b => b.UserId == userId) // Фильтруем книги по полю UserId
            .Include(b => b.Author) // Включаем данные об авторе книги
            .Include(b => b.Genre) // Включаем данные о жанре книги
            .ToListAsync();

        return userBooks;
    }


    /// <summary>
    /// Метод для регистрации пользователя
    /// </summary>
    /// <param name="model"></param>
    /// <returns></returns>

    public async Task<User> RegisterUser(RegisterModel model)
    {
        var newUser = new User
        {
            Name = model.Name,
            Email = model.Email,
            Password = model.Password,
            UserRole = Role.User
        };

        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();
            
        return newUser;
    }
    
    /// <summary>
    /// Метод для удаления пользователя
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    public async Task<bool> DeleteUser(int userId)
    {
        // Найти пользователя по его идентификатору
        var user = await _context.Users.FindAsync(userId);
        if (user == null)
        {
            return false; // Пользователь не найден
        }

        // Удалить пользователя из базы данных
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return true; // Пользователь успешно удален
    }
}