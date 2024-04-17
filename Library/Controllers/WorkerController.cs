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
    private readonly WorkerService _workerService;
    private readonly BookService _bookService;
}