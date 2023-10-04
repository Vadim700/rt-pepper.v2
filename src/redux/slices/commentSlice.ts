import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { UserState } from '../../types';
import { fetchComments } from '../thunks/commentsThunks';

const initialState: UserState = {
  list: [],
  loading: false,
  error: null,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default commentSlice.reducer;

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};
