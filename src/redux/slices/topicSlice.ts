import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CounterState } from '../../types';

const initialState: CounterState = {
  topic: 'posts',
  limit: 10,
  pageNumber: 1,
  sortPostType: 'idAsc',
  sortTodoType: 'completed',
};

const topicSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setState: (state, { payload }: PayloadAction<string>) => {
      state.topic = payload;
    },
    setStateLimit: (state, { payload }: PayloadAction<number>) => {
      state.limit = payload;
    },
    setPageNumber: (state, { payload }: PayloadAction<number>) => {
      state.pageNumber = payload;
    },
    setSortPostType: (state, { payload }: PayloadAction<string>) => {
      state.sortPostType = payload;
    },
    setSortTodoType: (state, { payload }: PayloadAction<string>) => {
      state.sortTodoType = payload;
    },
  },
});

export const {
  setState,
  setStateLimit,
  setPageNumber,
  setSortPostType,
  setSortTodoType,
} = topicSlice.actions;

export default topicSlice.reducer;
