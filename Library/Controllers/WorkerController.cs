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

    public WorkerController(BookService bookService, WorkerService workerService)
    {
        _bookService = bookService;
        _workerService = workerService;
    }
    
    [HttpPost("add-book")]
    public async Task<IActionResult> AddBook([FromBody] BookModel model)
    {
        try
        {
            var addedBook = await _workerService.AddBookAsync(model);
            return Ok(addedBook);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPut("edit-book/{bookId}")]
    public async Task<IActionResult> EditBook(int bookId, [FromBody] BookModel model)
    {
        try
        {
            var editedBook = await _bookService.EditBookAsync(bookId, model);
            return Ok(editedBook);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    
    [HttpPost("add-genre")]
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

    [HttpPost("add-author")]
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


}
