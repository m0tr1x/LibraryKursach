namespace Library.Models;

public class RegisterModel
{
    public string Name { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
    public Role Role { get; set; }
}