using Library.Models;
using Library.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Library.Controllers;

/// <summary>
/// Контроллер администратора
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly UserService _userService;
    private readonly BookService _bookService;
    private readonly AdminService _adminService;

    public AdminController(UserService userService, BookService bookService, AdminService adminService)
    {
        _userService = userService;
        _bookService = bookService;
        _adminService = adminService;
    }
    
    [HttpPost("register-user")]
    public async Task<IActionResult> RegisterWorker([FromBody] RegisterModel model)
    {
        // Регистрация нового пользователя с помощью сервиса пользователей
        var newWorker = await _adminService.RegisterEmployee(model);
        return Ok(newWorker);
    }
    /// <summary>
    /// Метод для удаления пользователя по айди
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    [HttpDelete("delete-user/{userId}")]
    public async Task<IActionResult> DeleteUser(int userId)
    {
        // Удаление пользователя по его идентификатору с помощью сервиса пользователей
        var success = await _userService.DeleteUser(userId);
        if (success)
        {
            return Ok("Пользователь успешно удален.");
        }
        else
        {
            return BadRequest("Ошибка при удалении пользователя.");
        }
    }

    [HttpGet("all-users")]
    public async Task<IActionResult> GetAllUsers()
    {
        // Получение списка всех пользователей из сервиса пользователей
        var allUsers = await _userService.GetAllUsers();
        return Ok(allUsers);
    }

    [HttpGet("all-books")]
    public async Task<IActionResult> GetAllBooks()
    {
        // Получение списка всех книг из сервиса книг
        var allBooks = await _bookService.GetAllBooks();
        return Ok(allBooks);
    }
}