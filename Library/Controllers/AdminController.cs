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
    private readonly RentalOperationService _rentalOperationService;

    public AdminController(UserService userService, BookService bookService,RentalOperationService rentalOperationService)
    {
        _userService = userService;
        _bookService = bookService;
        _rentalOperationService = rentalOperationService;
    }
    
    
    /// <summary>
    /// Метод для удаления пользователя по айди
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    [HttpDelete("delete-user/userId={userId}")]
    public async Task<IActionResult> DeleteUser(int userId)
    {
        try
        {
            // Получаем список всех книг пользователя
            var userBooks = await _bookService.GetUserBooks(userId);
            foreach (var book in userBooks)
            {
                _bookService.DeleteBook(book.Id);
            }
            // Удаляем пользователя
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
        catch (Exception ex)
        {
            // Обработка исключения при возникновении ошибки
            return StatusCode(500, $"Внутренняя ошибка сервера: {ex.Message}");
        }
    }


    [HttpGet("all-users")]
    public async Task<IActionResult> GetAllUsers()
    {
        // Получение списка всех пользователей из сервиса пользователей
        var allUsers = await _userService.GetAllUsers();
        return Ok(allUsers);
    }
    

    [HttpPut("edit-user/userId={userId}&&name={name}&&email={email}&&role={role}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> EditUser(int userId, string email, string name, Role role)
    {
        try
        {
            await _userService.UpdateUser(userId, email, name, role);
            return Ok("Данные пользователя успешно обновлены");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
   
        
    }

}