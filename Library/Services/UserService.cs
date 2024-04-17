using System.Threading.Tasks;
using Library.Models;
using Microsoft.EntityFrameworkCore;

namespace Library.Services;

public class UserService
{
    private readonly AppDbContext _context;

    public UserService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<User> GetUserById(int userId)
    {
        return await _context.Users.FindAsync(userId);
    }
    
    public async Task<User> GetUserByEmail(string email)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
    }
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
}