import {
   createSlice,
   PayloadAction,
   createAsyncThunk,
   AnyAction,
} from '@reduxjs/toolkit';

export interface User {
   id: number;
   name: string;
   username: string;
   email: string;
   address: Address;
   phone: string;
   website: string;
   company: Company;
}

export interface Address {
   street: string;
   suite: string;
   city: string;
   zipcode: string;
   geo: Geo;
}

export interface Geo {
   lat: string;
   lng: string;
}

export interface Company {
   name: string;
   catchPhrase: string;
   bs: string;
}

type UserState = {
   list: User[];
   loading: boolean;
   error: string | null;
};

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
