import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type CounterState = {
   topic: string;
   limit: number;
};

const initialState: CounterState = {
   topic: 'posts',
   limit: 10,
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
   },
});

export const { setState, setStateLimit } = topicSlice.actions;

export default topicSlice.reducer;
