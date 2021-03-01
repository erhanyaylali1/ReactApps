import { configureStore } from '@reduxjs/toolkit';
import cardSlice from '../features/cardSlice';
import userReducer from '../features/userSlice';

export default configureStore({
  reducer: {
    card: cardSlice,
    user: userReducer
  },
});
