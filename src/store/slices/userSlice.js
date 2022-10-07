import {createSlice} from '@reduxjs/toolkit';
import { getLocalStorage } from '../../utils/localstorage';
const initialState = getLocalStorage('store')

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.img = action.payload.img;
            state.id = action.payload.id;
            state.name = action.payload.name;
        },
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = null;
            state.name = null;
            state.img = null;
        },
    },
});

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;