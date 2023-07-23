import { configureStore } from '@reduxjs/toolkit';
import topicSlice from './slices/stateSlice';

const store = configureStore({
   reducer: {
      topic: topicSlice,
   },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
