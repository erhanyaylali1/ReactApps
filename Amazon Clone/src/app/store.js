import { configureStore } from '@reduxjs/toolkit';
import cardSlice from '../features/counterSlice';
import userReducer from '../features/userSlice';

export default configureStore({
  reducer: {
    card: cardSlice,
    user: userReducer
  },
});
