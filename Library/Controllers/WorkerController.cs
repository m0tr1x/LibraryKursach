using Library.Models;
using Library.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Library.Controllers;


/// <summary>
/// Контроллер для работы с сотрудниками
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Worker")]
public class WorkerController : ControllerBase
{
    private readonly BookService _bookService;
    private readonly WorkerService _workerService;
    private readonly RentalOperationService _rentalOperationService;

    public WorkerController(BookService bookService, WorkerService workerService, RentalOperationService rentalOperationService)
    {
        _rentalOperationService = rentalOperationService;
        _bookService = bookService;
        _workerService = workerService;
    }
    
    [HttpPost("add-book")]
    public async Task<IActionResult> AddBook(BookModel model)
    {
        try
        {
            var addedBook = await _workerService.AddBookAsync(model);
            if (addedBook) return Ok("Книга успешно добавлена");
            else return BadRequest("Не удалось добавить книгу");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("edit-book/bookId={bookId}&&title={title}&&author={author}&&genre={genre}")]
    public async Task<IActionResult> EditBook(int bookId, string title, string author, string genre)
    {
        try
        {
            var editedBook = await _bookService.EditBookAsync(bookId, title, author, genre);
            return Ok("Книга успешно обновлена");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    
    [HttpDelete("delete-book/bookId={bookId}")]
    public async Task<IActionResult> DeleteBook(int bookId)
    {
        try
        {
            var editedBook = await _bookService.DeleteBook(bookId);
            return Ok(editedBook);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    
    [HttpPost("add-genre/genreName={genreName}")]
    public async Task<IActionResult> AddGenre(string genreName)
    {
        var success = await _workerService.AddGenre(genreName);
        if (success)
        {
            return Ok("Жанр успешно добавлен.");
        }
        else
        {
            return BadRequest("Жанр с таким названием уже существует.");
        }
    }

    [HttpPost("add-author/authorName={authorName}")]
    public async Task<IActionResult> AddAuthor(string authorName)
    {
        var success = await _workerService.AddAuthor(authorName);
        if (success)
        {
            return Ok("Автор успешно добавлен.");
        }
        else
        {
            return BadRequest("Автор с таким именем уже существует.");
        }
    }
    
    [HttpPost("give-book/bookId={bookId}&userId={userId}")]
    public async Task<IActionResult> GiveBook(int bookId, int userId)
    {
        var result = await _bookService.GiveBook(userId,bookId);
        if(result) return Ok("Книга выдана пользователю");
        else return BadRequest("Не удалось выдать книгу");
    }
    
    [HttpGet("all-rental-operations")]
    [Authorize(Roles = "Worker")]
    public async Task<IActionResult> GetAllRentalOperations()
    {
        var rentalOperations = await _rentalOperationService.GetAllAvaliableRentalOperationsAsync();
        return Ok(rentalOperations);
    }
    
    

}
