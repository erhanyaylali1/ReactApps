import { createSlice } from '@reduxjs/toolkit';

export const statusSlice = createSlice({
    name: 'status',
    initialState: {
        isNavbarOpen: false
    },
    reducers: {
        toggleNavbar: (state) => {
            state.isNavbarOpen = !state.isNavbarOpen; 
            console.log(state.isNavbarOpen);
        }
    },
});

export const { toggleNavbar } = statusSlice.actions;
export const getIsNavbarOpen = (state) =>  state.status.isNavbarOpen;
export default statusSlice.reducer;
