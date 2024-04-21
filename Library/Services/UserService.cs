using Library.Models;
using Microsoft.AspNetCore.Mvc;
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
    /// Метод для поиска юзера по его id
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public async Task<User> GetUserById(int id)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
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
    /// Метод для регистрации 
    /// </summary>
    /// <param name="model"></param>
    /// <returns></returns>

    public async Task<bool> Register([FromBody]RegisterModel model)
    {
        var newUser = new User
        {
            Name = model.Name,
            Email = model.Email,
            Password = model.Password,
            UserRole = model.Role
        };
        _context.Users.Add(newUser);
        await _context.SaveChangesAsync(); // Сохранение данных в базу данных
        return true;
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

    
    /// <summary>
    /// Метод для изменения данных пользователя
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="user"></param>
    /// <returns></returns>
    public async Task<bool> UpdateUser(int userId, string email, string name, Role role)
    {
        // Получаем пользователя из базы данных по его идентификатору
        var existingUser = await _context.Users.FindAsync(userId);
        if((await _context.Users.AnyAsync(u => u.Email == email) && existingUser.Id != userId)) throw new Exception("Пользователь с таким email уже существует");
    
        // Проверяем, существует ли пользователь с указанным идентификатором
        if (existingUser == null) throw new Exception("Пользователь не найден");
    
        // Обновляем данные пользователя на основе предоставленного объекта user
        existingUser.Name = name;
        existingUser.Email = email;
        existingUser.UserRole = role;
        // Сохраняем обновленного пользователя в базе данных
        _context.Users.Update(existingUser);
        await _context.SaveChangesAsync();
    
        return true; // Возвращаем true, чтобы показать успешное обновление
    }

}