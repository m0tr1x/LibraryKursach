
import {configureStore} from "@reduxjs/toolkit";
import {bookReducer} from "./Hooks/userhooks.tsx";



const store = configureStore({
    reducer: {
        books: bookReducer,
    }
});

export default store;
