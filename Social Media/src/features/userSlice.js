import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        isLogged: false,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isLogged = true;
        },
        logout: (state) => {
            state.user = {};
            state.isLogged = false;
        },
    },
});

export const { login, logout } = userSlice.actions;
export const getUser = (state) => state.user.user;
export const getIsLogged = (state) => state.user.isLogged;
export default userSlice.reducer;
