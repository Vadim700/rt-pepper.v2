import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type CounterState = {
   topic: string;
   limit: number;
   pageNumber: number;
};

const initialState: CounterState = {
   topic: 'posts',
   limit: 10,
   pageNumber: 1,
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
   },
});

export const { setState, setStateLimit, setPageNumber } = topicSlice.actions;

export default topicSlice.reducer;
