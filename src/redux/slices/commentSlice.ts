import {
   createSlice,
   PayloadAction,
   createAsyncThunk,
   AnyAction,
} from '@reduxjs/toolkit';

type Comment = {
   id: number;
   postId: number;
   email: string;
   body: string;
   name: string;
};

type CommentState = {
   list: Comment[];
   loading: boolean;
   error: string | null;
};

export const fetchComments = createAsyncThunk<
   Comment[],
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

const initialState: CommentState = {
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
