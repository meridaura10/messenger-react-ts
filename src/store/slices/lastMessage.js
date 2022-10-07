import {createSlice} from '@reduxjs/toolkit';
import { getLocalStorage } from '../../utils/localstorage';

const initialState = getLocalStorage('lastMessage')
const lastMessageSlice = createSlice({
    name: 'lastMessage',
    initialState,
    reducers: {
        setLastMessage(state, action) {
            state.chatId = action.payload.chatId;
            state.lastMessage = action.payload.lastMessage;
        }
    },
});

export const {setLastMessage} = lastMessageSlice.actions;

export default lastMessageSlice.reducer;