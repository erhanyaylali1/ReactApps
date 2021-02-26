import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/userSlice';
import mailSlice from '../features/mailSlice';

export default configureStore({
  reducer: {
    user: userSlice,
    mail: mailSlice
  },
});