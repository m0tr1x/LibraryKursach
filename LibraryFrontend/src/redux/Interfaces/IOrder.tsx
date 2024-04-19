import {IBook} from "./IBook.tsx";
import {IUser} from "./IUser.tsx";

export interface IOrder
{
    id: number;
    userId: number | null;
    user: IUser;
    bookId: number;
    book: IBook;
    startDate: Date;
    endDate: Date;
    status: string;
}
