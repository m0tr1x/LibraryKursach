using Library.Models;

namespace Library.Services;

public class AdminService
{
    private readonly AppDbContext _context;
    
    public AdminService(AppDbContext context) { _context = context;}
    
    public async Task<User> RegisterEmployee(RegisterModel model)
    {
        var newEmployee = new User
        {
            Name = model.Name,
            Email = model.Email,
            Password = model.Password,
            UserRole = Role.Worker // Устанавливаем роль работника
        };

        _context.Users.Add(newEmployee);
        await _context.SaveChangesAsync();

        return newEmployee;
    }

}