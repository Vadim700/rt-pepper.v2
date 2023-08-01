import {
   createSlice,
   PayloadAction,
   createAsyncThunk,
   AnyAction,
} from '@reduxjs/toolkit';

type Post = {
   id: number;
   userId: number;
   title: string;
   body: string;
};

type PostState = {
   list: Post[];
   loading: boolean;
   error: string | null;
};

export const fetchPosts = createAsyncThunk<
   Post[],
   any,
   { rejectValue: string }
>('post/fetchPosts', async (url, { rejectWithValue }) => {
   const limit = url.itemsPerPage;
   const page = url.pageNumber;

   const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`,
   );

   if (!response.ok) {
      return rejectWithValue('Server Error!');
   }

   const data = await response.json();

   localStorage.posts = JSON.stringify(data);

   return data;
});

export const deletePost = createAsyncThunk<
   string,
   string,
   { rejectValue: string }
>('post/deletePost', async function (id, { rejectWithValue }) {
   const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
         method: 'DELETE',
      },
   );
   if (!response.ok) {
      return rejectWithValue("Can't delete this post ;)");
   }

   return id;
});

const initialState: PostState = {
   list: [],
   loading: false,
   error: null,
};

const postSlice = createSlice({
   name: 'post',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchPosts.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchPosts.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
         })
         .addCase(deletePost.fulfilled, (state, action) => {
            state.list = state.list.filter(
               (post) => String(post.id) !== action.payload,
            );
         })
         .addMatcher(isError, (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
         });
   },
});

export default postSlice.reducer;

const isError = (action: AnyAction) => {
   return action.type.endsWith('rejected');
};
