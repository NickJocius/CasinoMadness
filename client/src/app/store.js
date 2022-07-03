/* 
    Name: store.js
    Purpose: File for Redux store
    Create root reducer and configure redux-persist
*/

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//import { logout } from "../utils/actions-common/actions";

import userReducer from '../features/user/userSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    //blacklist: ['navExpand']
};

const reducers = combineReducers({
    user: userReducer,  
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

/* export const resetStore = async () => {
    await persistor.purge();
    store.dispatch(logout());
    await persistor.flush();
}; */