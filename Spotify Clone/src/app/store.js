import { configureStore } from '@reduxjs/toolkit';
import userCounter from '../features/userSlice';

export default configureStore({
    reducer: {
        user: userCounter,
    },
});
