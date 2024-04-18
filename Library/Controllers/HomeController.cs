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

        public HomeController(UserService userService) // Внедрите UserService в конструктор контроллера
        {
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
            var newUser = await _userService.RegisterUser(registerModel);

            return Ok("Пользователь успешно зарегистрирован");
        }
    }
}