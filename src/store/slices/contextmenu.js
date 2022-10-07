import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    x:0,
    y:0,
    open: false,
    messageId: '',
    chatId: ''
}

const contextmenuSlice = createSlice({
    name: 'contextmenu',
    initialState,
    reducers: {
        setOpneContextmenu(state, action) {
            state.x = action.payload.x;
            state.y = action.payload.y;
            state.open = action.payload.open;
            state.messageId = action.payload.messageId
            state.chatId = action.payload.chatId
        },
    },
});

export const {setOpneContextmenu} = contextmenuSlice.actions;

export default contextmenuSlice.reducer;