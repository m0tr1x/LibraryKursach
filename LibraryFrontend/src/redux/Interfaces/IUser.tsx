import {IBook} from "./IBook.tsx";
import {Role} from "./Role.tsx";

export interface IUser{
    id: number;
    name: string;
    password: string;
    email: string;
    userRole: Role;
    books: IBook[] | null; // Массив книг или null, если пользователь не имеет книг
    rentalOperations: any[] | null; // Массив операций аренды или null, если операции отсутствуют
}
