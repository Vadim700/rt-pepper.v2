import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type CounterState = {
   topic: string;
   limit: number;
   pageNumber: number;
   sortType: string;
};

const initialState: CounterState = {
   topic: 'posts',
   limit: 10,
   pageNumber: 1,
   sortType: 'idAsc',
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
      setSortType: (state, action: PayloadAction<string>) => {
         state.sortType = action.payload;
      },
   },
});

export const { setState, setStateLimit, setPageNumber, setSortType } =
   topicSlice.actions;

export default topicSlice.reducer;
