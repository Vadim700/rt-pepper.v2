import { configureStore } from '@reduxjs/toolkit';
import topicSlice from './slices/topicSlice';
import todoSlice from './slices/todoSlice';
import postSlice from './slices/postsSlice';
import commentSlice from './slices/commentSlice';

const store = configureStore({
   reducer: {
      topic: topicSlice,
      todo: todoSlice,
      post: postSlice,
      comment: commentSlice,
   },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
