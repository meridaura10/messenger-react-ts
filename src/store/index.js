import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import contextmenu from './slices/contextmenu'
import lastMessage from './slices/lastMessage';
import { setLocalStorage } from '../utils/localstorage';
const store = configureStore({
    reducer: {
        user: userReducer,
        lastMessage: lastMessage,
        contextmenu: contextmenu,
    }
});

store.subscribe( () =>{
    setLocalStorage('store',store.getState().user)
} )

export default store
