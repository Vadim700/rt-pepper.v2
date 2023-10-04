import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types';

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>('users/fetchUsers', async (obj, { rejectWithValue }) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);

  if (!response.ok) {
    return rejectWithValue('Server Error!');
  }

  const data = await response
    .json()
    .then((data) => data.map((user: any) => user.name));

  return data;
});
