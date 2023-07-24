import { configureStore } from '@reduxjs/toolkit';
import topicSlice from './slices/stateSlice';
import todoSlice from './slices/todoSlice';

const store = configureStore({
   reducer: {
      topic: topicSlice,
      todo: todoSlice,
   },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
