import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from '@reduxjs/toolkit';
import { stat } from 'fs';

type Post = {
  id: number;
  name: any;
  userId: number;
  title: string;
  body: string;
  checked: boolean;
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

  const users = await fetch(`https://jsonplaceholder.typicode.com/users`)
    .then((res) => res.json())
    .then((data) => data.map((user: any) => user.name));

  if (!response.ok) {
    return rejectWithValue('Server Error!');
  }

  const data = await response.json();

  const postsWithSelected = data.map((item: Post) => ({
    ...item,
    checked: false,
    name: users[Number(String(item.id).split('').pop())],
  }));

  return postsWithSelected;
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
    const { title, body, id, name } = obj;

    const post = {
      title,
      userId: 1,
      body,
      id,
      name,
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
  const { title, body, id, name } = obj;

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
          name,
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
  reducers: {
    toggleChecked: (state, { payload }: PayloadAction<number>) => {
      const checkedItem = state.list.find((item) => item.id === payload);

      if (checkedItem) {
        checkedItem.checked = !checkedItem.checked;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.list = payload;
        state.loading = false;
      })

      .addCase(deletePost.fulfilled, ({ list }, { payload }) => {
        list = list.filter((post) => String(post.id) !== payload);
      })

      .addCase(addNewPost.pending, (state) => {
        state.error = null;
      })

      .addCase(addNewPost.fulfilled, ({ list }, { payload }) => {
        list.push(payload);
      })

      .addCase(editPost.fulfilled, (state, { payload }) => {
        const editedPost = state.list.find((item) => item.id === payload.id);
        if (editedPost) {
          editedPost.title = payload.title;
          editedPost.body = payload.body;
          editedPost.name = payload.name;
        }
      })

      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { toggleChecked } = postSlice.actions;

export default postSlice.reducer;

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};
