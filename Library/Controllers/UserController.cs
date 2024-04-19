using System.Security.Claims;
using Library.Models;
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
        private readonly RentalOperationService _rentalOperationService;

        public UserController(UserService userService, BookService bookService, RentalOperationService rentalOperationService)
        {
            _userService = userService;
            _bookService = bookService;
            _rentalOperationService = rentalOperationService;
        }

        [HttpGet("my-books")]
        public async Task<IActionResult>  GetMyBooks()
        {
            // Получить список книг пользователя из сервиса пользователя
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var userBooks = await _userService.GetUserBooksAsync(userId);
            return Ok(userBooks);
        }

        [HttpGet("available-books")]
        public async Task<IActionResult> GetAvailableBooks()
        {
            // Получить список доступных книг в библиотеке из сервиса книг
            var availableBooks = await _bookService.GetAvailableBooks();
            return Ok(availableBooks);
        }

        [HttpPost("purshace-book/bookId={bookId}")]
        public async Task<IActionResult> PurshaceBook(int bookId)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            // Попытаться взять книгу у сервиса книг
            var success = await _bookService.PurchaseBook(userId, bookId);
            if (success)
            {
                var rentalOperation = new RentalOperation
                {
                    UserId = userId,
                    BookId = bookId,
                    StartDate = DateTime.UtcNow,
                    Status = "Ordered"
                };

                try
                {
                    await _rentalOperationService.AddRentalOperation(rentalOperation);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("An error occurred while adding a rental operation:");
                    Console.WriteLine(ex.Message);
                }


                return Ok("Книга успешно заказана.");
            }
            else
            {
                return BadRequest("Книга не доступна для взятия.");
            }
        }

        [HttpPost("return-book/bookId={bookId}")]
        public async Task<IActionResult> ReturnBook(int bookId)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var success = await _bookService.ReturnBook(bookId, userId);
            if (success)
            {
                try
                {
                    var rentalOperation = await _rentalOperationService.GetRentalOperationByBookAndUser(bookId, userId);
                    // Установить время окончания аренды
                    rentalOperation.EndDate = DateTime.UtcNow;
                    await _rentalOperationService.UpdateRentalOperation(rentalOperation);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("An error occurred while updating a rental operation:");
                    Console.WriteLine(ex.Message);
                }
                return Ok("Книга успешно возвращена.");
            }
            else
            {
                return BadRequest("Ошибка при возврате книги.");
            }
        }
}