using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Library.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Library.Services
{
    public class BookService
    {
        private readonly AppDbContext _context;

        public BookService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Book>> GetAllBooks()
        {
            return await _context.Books.ToListAsync();
        }
        
        public async Task<List<Book>> GetAvailableBooks()
        {
            return await _context.Books.Where(b => b.IsAvailable).ToListAsync();
        }


        public async Task<bool> TakeBook(int userId, int bookId)
        {
            var book = await _context.Books.FindAsync(bookId);
            if (book == null || !book.IsAvailable)
            {
                return false; // Книга не найдена или недоступна
            }

            // Обновляем состояние книги
            book.IsAvailable = false;
            book.UserId = userId;
            _context.Books.Update(book);
            await _context.SaveChangesAsync();
            return true; // Книга успешно взята пользователем
        }

        public async Task<bool> ReturnBook(int bookId, int userId)
        {
            var book = await _context.Books.FindAsync(bookId);
            if (book == null || book.IsAvailable || book.UserId != userId)
            {
                return false; // Книга не найдена, уже доступна или не была взята этим пользователем
            }

            // Обновляем состояние книги
            book.IsAvailable = true;
            book.UserId = null;
            _context.Books.Update(book);
            await _context.SaveChangesAsync();
            return true; // Книга успешно возвращена в библиотеку
        }

    }
}