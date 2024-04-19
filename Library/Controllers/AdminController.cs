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
    
    [HttpGet("all-rental-operations")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAllRentalOperations()
    {
        var rentalOperations = await _rentalOperationService.GetAllRentalOperationsAsync();
        return Ok(rentalOperations);
    }
    [HttpGet("edit-user/userId={userId}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> EditUser(int userId, [FromBody] User user)
    {
        var success = await _userService.UpdateUser(userId, user);
        if (success)
        {
            return Ok("Пользователь успешно отредактирован.");
        }
        else
        {
            return BadRequest("Ошибка при редактировании пользователя.");
        
    }
    

}