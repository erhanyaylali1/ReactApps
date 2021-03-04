import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
    name: 'user',
    initialState: {
        info: {},
        playlists: [],
        playing: false,
        item: null,
        token: ""
    },
    reducers: {
        login: (state, action) => {
            state.info = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setPlaylists: (state, action) => {
            state.playlists = action.payload;
        }
    },
});

export const { login, setToken, setPlaylists } = counterSlice.actions;

export const getUserInfo = (state) => state.user.info;
export const getPlaylists = (state) => state.user.playlists;
export const getPlaying = (state) => state.user.playing;
export const getItem = (state) => state.user.item;
export const getToken = (state) => state.user.token;

export default counterSlice.reducer;
