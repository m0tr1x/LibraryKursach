import { createAsyncThunk } from '@reduxjs/toolkit';
import {getAvailableBooks, purchaseBook} from "../../api/api.tsx";


export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
    const response = await getAvailableBooks();
    return response.data; // Предположим, что API возвращает объект с данными книг
});

export const purchaseBookAction = createAsyncThunk(
    'books/purchaseBook',
    async ({ bookId, userId }: { bookId: number; userId: number }) => {
        await purchaseBook(bookId, userId);
        return bookId; // Возвращаем id купленной книги
    }
);
