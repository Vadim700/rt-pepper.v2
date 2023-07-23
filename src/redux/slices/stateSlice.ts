import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type CounterState = {
   topic: string;
};

const initialState: CounterState = {
   topic: 'posts',
};

const topicSlice = createSlice({
   name: 'state',
   initialState,
   reducers: {
      setState: (state, action: PayloadAction<string>) => {
         state.topic = action.payload;
      },
   },
});

export const { setState } = topicSlice.actions;

export default topicSlice.reducer;
