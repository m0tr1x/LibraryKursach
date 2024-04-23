import { createSlice } from '@reduxjs/toolkit';
import {fetchBooks, purchaseBookAction} from "./Actions.tsx";


const initialState = {
    availableBooks: [],
    loading: false,
    error: null,
};

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.availableBooks = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(purchaseBookAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(purchaseBookAction.fulfilled, (state, action) => {
                state.loading = false;
                // Обновляем состояние, если нужно
            })
            .addCase(purchaseBookAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { reducer: bookReducer } = bookSlice;
