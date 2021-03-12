import { createSlice } from '@reduxjs/toolkit';

export const statusSlice = createSlice({
    name: 'status',
    initialState: {
        isNavbarOpen: false,
        refresh: false,
    },
    reducers: {
        toggleNavbar: (state) => {
            state.isNavbarOpen = !state.isNavbarOpen; 
        },
        refresh: (state) => {
            state.refresh = !state.refresh;
        }
    },
});

export const { toggleNavbar, refresh } = statusSlice.actions;
export const getRefresh = (state) =>  state.status.refresh;
export const getIsNavbarOpen = (state) =>  state.status.isNavbarOpen;
export default statusSlice.reducer;
