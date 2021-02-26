import { createSlice } from '@reduxjs/toolkit';

export const mailSlice = createSlice({

	name: 'mail',
	initialState: {
		selectedMail: null,
		visibility: false,
	},
	reducers: {
		openBox: (state) => {
			state.visibility = true;
		},
		closeBox: (state) => {
			state.visibility = false;
		},
		selectMail: (state, action) => {
			state.selectedMail = action.payload;
		}
	}
});

export const { openBox, closeBox, selectMail } = mailSlice.actions;
export const selectVisibility = (state) => state.mail.visibility;
export const getSelectedMail = (state) => state.mail.selectedMail;
export default mailSlice.reducer;