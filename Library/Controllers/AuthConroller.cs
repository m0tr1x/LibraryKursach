using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Library.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;


namespace Library.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthConroller : ControllerBase
{
    private readonly IConfiguration _configuration; //Конфиг
    private readonly AppDbContext _context; //Контекст дб

    public AuthConroller(IConfiguration configuration, AppDbContext context)
    {
        _configuration = configuration;
        _context = context;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody]LoginModel loginModel)
    {
        var user = await _context.Users.SingleOrDefaultAsync(u =>
            u.Email == loginModel.Email && u.Password == loginModel.Password);
        if (user == null)
        {
            return Unauthorized();
        }

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()), // Записали в клейм  айди 
            new Claim(ClaimTypes.Role, user.UserRole.ToString())
        }; // Добавляем клеймы по роли и по емейлу
        var jwt = new JwtSecurityToken( // Создаём токен
            issuer: AuthOptions.ISSUER,
            audience: AuthOptions.AUDIENCE,
            claims: claims,
            expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(3)), // Задаем время действия
            signingCredentials: new SigningCredentials(AuthOptions.GetSymSecurityKey(), SecurityAlgorithms.HmacSha256));
        ;
        return Ok(new JwtSecurityTokenHandler().WriteToken(jwt)); //Если с пользователем все ок вернули ему токен

    }
}