import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type CounterState = {
   topic: string;
   limit: number;
   pageNumber: number;
   sortPostType: string;
   sortTodoType: string;
};

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
      setState: (state, action: PayloadAction<string>) => {
         state.topic = action.payload;
      },
      setStateLimit: (state, action: PayloadAction<number>) => {
         state.limit = action.payload;
      },
      setPageNumber: (state, action: PayloadAction<number>) => {
         state.pageNumber = action.payload;
      },
      setSortPostType: (state, action: PayloadAction<string>) => {
         state.sortPostType = action.payload;
      },
      setSortTodoType: (state, action: PayloadAction<string>) => {
         state.sortTodoType = action.payload;
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
