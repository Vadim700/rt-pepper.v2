import { createAsyncThunk } from '@reduxjs/toolkit';
import { PathUrls, Post, PostState } from '../../types';

const path: PathUrls = {
  posts: 'https://jsonplaceholder.typicode.com/posts',
  albums: 'https://jsonplaceholder.typicode.com/albums',
  todos: 'https://jsonplaceholder.typicode.com/todos',
};

// fetch posts data length
export const fetchPostsDataLength = createAsyncThunk<
  number[],
  void,
  { rejectValue: any }
>('post/fetchPostsDataLength', async (_, { rejectWithValue }) => {
  try {
    const responses = await Promise.all([
      fetch(path.posts),
      fetch(path.albums),
      fetch(path.todos),
    ]);

    if (responses.some((response) => !response.ok)) {
      throw new Error('One or more requests failed');
    }

    const data = await Promise.all(
      responses.map((response) => response.json()),
    );
    const lengths = data.map((array) => array.length);

    return lengths;
  } catch (error) {
    return rejectWithValue('Server Error!');
  }
});

// fetch posts
export const fetchPosts = createAsyncThunk<
  Post[], // >>>
  any, // <<<
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

  const users = await fetch(`https://jsonplaceholder.typicode.com/users`)
    .then((res) => res.json())
    .then((data) => data.map((user: any) => user.name));

  const postsWithSelected = data.map((item: Post) => ({
    ...item,
    checked: false,
    name: users[Number(String(item.id).split('').pop())],
  }));

  return postsWithSelected;
});

// delete post
export const deletePost = createAsyncThunk<
  string, // >>>
  string, // <<<
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

// delete some posts
export const deletePosts = createAsyncThunk<
  any,
  number[],
  { rejectValue: string }
>('post/deletePosts', async function (ids, { rejectWithValue }) {
  const promises = ids.map(async (id) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      return rejectWithValue(`Can't delete post with ID: ${id}`);
    }

    return id;
  });

  const results = await Promise.all(promises);

  return results;
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
