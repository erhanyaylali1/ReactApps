import { createSlice } from '@reduxjs/toolkit';

export const cardSlice = createSlice({
	name: 'card',
	initialState: {
		items: [],
		total: 0
	},

	reducers: {

		addToCard: (state, action) => {
			state.items.push(action.payload);
			state.total += action.payload.price;
		},	

		removeFromCard: (state, action) => {
		
			const index = state.items.findIndex(item => item.id === action.payload.id);
            console.log(index);
			if (index >= 0) {
				state.items.splice(index, 1); 
				state.total -= action.payload.price;
			} else {
				console.warn(`${action.payload.title} can't remove from Shopping Basket`);
			}
			if(!state.items.length) {
				state.total = 0;
			}
		},

		clearCard: (state) => {
			state.items = [];
			state.total = 0;
		}

  },
});

export const { addToCard, removeFromCard, clearCard } = cardSlice.actions;
export const getItems = state => state.card.items;
export const getTotal = state => state.card.total;
export default cardSlice.reducer;