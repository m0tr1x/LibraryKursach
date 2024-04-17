using Library.Models;

namespace Library.Services;

/// <summary>
/// Сервис для работников
/// </summary>
public class WorkerService
{
    private readonly AppDbContext _context;
    
    public WorkerService(AppDbContext context) {_context = context;}
}