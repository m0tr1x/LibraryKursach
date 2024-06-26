using Microsoft.AspNetCore.Mvc;
using Library.Services; // Добавьте этот using для доступа к сервису UserService
using Library.Models; // Добавьте этот using для доступа к моделям

namespace Library.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly UserService _userService; // Используйте ваш сервис UserService вместо контекста и конфигурации
        private readonly BookService _bookService;

        public HomeController(UserService userService, BookService bookService) // Внедрите UserService в конструктор контроллера
        {
            _bookService = bookService;
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterModel registerModel)
        {
            // Проверка наличия пользователя с таким же email в базе данных
            var existingUser = await _userService.GetUserByEmail(registerModel.Email);
            if (existingUser != null)
            {
                return BadRequest("Пользователь с таким email уже существует");
            }

            // Регистрация нового пользователя с использованием метода RegisterUser из UserService
            var newUser = await _userService.Register(registerModel);

            return Ok("Пользователь успешно зарегистрирован");
        }
        
        [HttpGet("available-books")]
        public async Task<IActionResult> GetAvailableBooks()
        {
            // Получить список доступных книг в библиотеке из сервиса книг
            var availableBooks = await _bookService.GetAvailableBooks();
            return Ok(availableBooks);
        }
    }
}