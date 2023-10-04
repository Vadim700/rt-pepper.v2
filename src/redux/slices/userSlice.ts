import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';

import { UserState } from '../../types';
import { fetchUsers } from '../thunks/userThunks';

const initialState: UserState = {
  list: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};
