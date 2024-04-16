using Library.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Library.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HomeController : ControllerBase
{
    private readonly IConfiguration _configuration; //Конфиг
    private readonly AppDbContext _context; //Контекст дб

    public HomeController(IConfiguration configuration, AppDbContext context)
    {
        _configuration = configuration;
        _context = context;
    }


    /// <summary>
    /// Метод для регистрации нового пользователя
    /// </summary>
    /// <param name="registerModel"></param>
    /// <returns></returns>
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel registerModel)
    {
        
        
        // Проверка наличия пользователя с таким же email в базе данных
        var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == registerModel.Email);
        if (existingUser != null)
        {
            return BadRequest("Пользователь с таким email уже существует");
        }

        // Создание нового пользователя
        var newUser = new User
        {
            Name = registerModel.Name,
            Email = registerModel.Email,
            Password = registerModel.Password,
            UserRole = Role.User // Можно присвоить роль по умолчанию или оставить пустым, если роль необязательна
        };

        // Добавление пользователя в базу данных
        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();

        return Ok("Пользователь успешно зарегистрирован");
    }
}