using Library.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Library.Controllers;

/// <summary>
/// Контроллер пользователей
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "User")]
public class UserController : ControllerBase
{
        private readonly UserService _userService;
        private readonly BookService _bookService;

        public UserController(UserService userService, BookService bookService)
        {
            _userService = userService;
            _bookService = bookService;
        }

        [HttpGet("my-books")]
        public IActionResult GetMyBooks()
        {
            // Получить список книг пользователя из сервиса пользователя
            var userId = int.Parse(User.Identity.Name);
            var userBooks = _userService.GetUserBooksAsync(userId);
            return Ok(userBooks);
        }

        [HttpGet("available-books")]
        public async Task<IActionResult> GetAvailableBooks()
        {
            // Получить список доступных книг в библиотеке из сервиса книг
            var availableBooks = await _bookService.GetAvailableBooks();
            return Ok(availableBooks);
        }

        [HttpPost("take-book/{bookId}")]
        public async Task<IActionResult> TakeBook(int bookId)
        {
            var userId = int.Parse(User.Identity.Name);
            var user = await _userService.GetUserById(userId);
            // Попытаться взять книгу у сервиса книг
            var success = await _bookService.TakeBook(bookId, userId);
            if (success)
            {
                return Ok("Книга успешно взята.");
            }
            else
            {
                return BadRequest("Книга не доступна для взятия.");
            }
        }

        [HttpPost("return-book/{bookId}")]
        public async Task<IActionResult> ReturnBook(int bookId)
        {
            var userId = int.Parse(User.Identity.Name);
            var success = await _bookService.ReturnBook(bookId, userId);
            if (success)
            {
                return Ok("Книга успешно возвращена.");
            }
            else
            {
                return BadRequest("Ошибка при возврате книги.");
            }
        }
}