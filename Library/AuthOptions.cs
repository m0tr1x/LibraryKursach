using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Library;


/// <summary>
/// Тут аудитория, клиент, и генерация ключа
/// </summary>
public class AuthOptions
{
    public const string ISSUER = "MyAuthServer"; 
    public const string AUDIENCE = "MyAuthClient";
    const string KEY = "mysupersecret_secretsecretsecretkey!123";
    public static SymmetricSecurityKey GetSymSecurityKey() => 
        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
}
