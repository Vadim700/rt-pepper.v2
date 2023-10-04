import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchComments = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>('comment/fetchComments', async (id, { rejectWithValue }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${id}`,
  );

  if (!response.ok) {
    return rejectWithValue('Server Error!');
  }

  const data = await response.json();

  return data;
});
