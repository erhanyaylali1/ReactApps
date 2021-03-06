import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
    name: 'user',
    initialState: {
        info: {},
        playlists: [],
        spotify: {},
        token: "",
        playlistId: ""
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
        },
        setSpotify: (state, action) => {
            state.spotify = action.payload;
        },
        setPlaylistId: (state, action) => {
            state.playlistId = action.payload;
        }
    },
});

export const { login, setToken, setPlaylists, setSpotify, setPlaylistId } = counterSlice.actions;

export const getUserInfo = (state) => state.user.info;
export const getPlaylists = (state) => state.user.playlists;
export const getSpotify = (state) => state.user.spotify;
export const getToken = (state) => state.user.token;
export const getPlaylistId = (state) => state.user.playlistId;

export default counterSlice.reducer;
