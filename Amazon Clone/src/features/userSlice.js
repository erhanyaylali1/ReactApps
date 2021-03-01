import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		isLogged: false,
		user: null
	},

	reducers: {

		logIn: (state, action) => {
			state.user = action.payload;
			state.isLogged = true;
		},

		logOut: (state) => {
			state.user = null;
			state.isLogged = false;
		}
  	}
});

export const { logIn, logOut } = userSlice.actions;
export const getUser = state => state.user.user;
export const getIsLogged = state => state.user.isLogged;
export default userSlice.reducer;