using Library.Models;
using Microsoft.EntityFrameworkCore;

namespace Library.Services;

public class RentalOperationService
{
    private readonly AppDbContext _context;

    public RentalOperationService(AppDbContext context)
    {
        _context = context;
    }
    /// <summary>
    /// Метод получения всех арендных операций из базы данных
    /// </summary>
    /// <returns></returns>
    public async Task<List<RentalOperation>> GetAllRentalOperationsAsync()
    {
        // Получить все арендные операции из базы данных
        return await _context.RentalOperations.ToListAsync();
    }
    
    
    /// <summary>
    /// Метод для добавления арендной операции
    /// </summary>
    /// <param name="rentalOperation"></param>
    public async Task AddRentalOperation(RentalOperation rentalOperation)
    {
        _context.RentalOperations.Add(rentalOperation);
        await _context.SaveChangesAsync();
    }
    /// <summary>
    /// Метод для поиска арендной операции
    /// </summary>
    /// <param name="bookId"></param>
    /// <param name="userId"></param>
    /// <returns></returns>
    public async Task<RentalOperation> GetRentalOperationByBookAndUser(int bookId, int userId)
    {
        return await _context.RentalOperations
            .Where(ro => ro.BookId == bookId && ro.UserId == userId)
            .FirstOrDefaultAsync();
    }
    
    /// <summary>
    /// Мето для обновления арендной операции
    /// </summary>
    /// <param name="rentalOperation"></param>
    public async Task UpdateRentalOperation(RentalOperation rentalOperation)
    {
        _context.RentalOperations.Update(rentalOperation);
        await _context.SaveChangesAsync();
    }



}