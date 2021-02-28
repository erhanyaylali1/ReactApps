import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from '../features/weathcerSlice';

export default configureStore({
  reducer: {
    weather: weatherSlice,
  },
});
