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

// fetch posts
export const fetchPosts = createAsyncThunk<
   Post[],
   any,
   { rejectValue: string }
>('post/fetchPosts', async (url, { rejectWithValue }) => {
   let limit = '';
   let page = '';

   if (url.itemsPerPage) {
      limit = url.itemsPerPage;
      page = url.pageNumber;
   }

   const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`,
   );

   if (!response.ok) {
      return rejectWithValue('Server Error!');
   }

   const data = await response.json();

   // localStorage.posts = JSON.stringify(data);

   return data;
});

// delete post
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

// add new post
export const addNewPost = createAsyncThunk<Post, any, { rejectValue: string }>(
   'post/addNewPost',
   async (obj, { rejectWithValue }) => {
      const { title, body, id } = obj;

      const post = {
         title: title,
         userId: 1,
         body: body,
         id: id,
      };

      const response = await fetch(
         `https://jsonplaceholder.typicode.com/posts/${id}`,
         {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
         },
      );

      if (!response.ok) {
         return rejectWithValue("Can't add task");
      }

      return (await response.json()) as Post;
   },
);

//edit post
export const editPost = createAsyncThunk<
   Post,
   any,
   { rejectValue: string; state: { post: PostState } }
>('post/editPost', async (obj, { rejectWithValue, getState }) => {
   const { title, body, id } = obj;

   const post = getState().post.list.find((item) => item.id === Number(id));

   if (post) {
      const response = await fetch(
         `https://jsonplaceholder.typicode.com/posts/${id}`,
         {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               title,
               body,
            }),
         },
      );
      if (!response.ok) {
         return rejectWithValue("Can't add task");
      }
      return (await response.json()) as Post;
   }
   return rejectWithValue('no such todo id');
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
         .addCase(addNewPost.pending, (state) => {
            state.error = null;
         })
         .addCase(addNewPost.fulfilled, (state, action) => {
            state.list.push(action.payload);
         })
         .addCase(editPost.fulfilled, (state, action) => {
            const editedPost = state.list.find(
               (item) => item.id === action.payload.id,
            );
            if (editedPost) {
               editedPost.title = action.payload.title;
               editedPost.body = action.payload.body;
            }
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
