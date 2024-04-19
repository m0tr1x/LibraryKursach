import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer'; // Подставьте свой путь до файла с редуктором

const store = configureStore({
    reducer: {
        //user: userReducer // user - это ключ, по которому будет доступен этот редуктор в глобальном состоянии
    }
});

export default store;
