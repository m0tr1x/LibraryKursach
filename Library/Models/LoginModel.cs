using System.ComponentModel.DataAnnotations.Schema;

namespace Library.Models;

public class LoginModel
{
    public string Email { get; set; }
    public string Password { get; set; }
}