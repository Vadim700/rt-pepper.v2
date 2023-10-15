import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';

import { PostState } from '../../types';

import {
  fetchPosts,
  deletePost,
  deletePosts,
  addNewPost,
  editPost,
  fetchPostsDataLength,
} from '../thunks/postsThunks';

const initialState: PostState = {
  list: [],
  length: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    togglePostItemChecked: (state, { payload }: PayloadAction<number>) => {
      const checkedItem = state.list.find((item) => item.id === payload);
      if (checkedItem) {
        checkedItem.checked = !checkedItem.checked;
      }
    },

    clearChecked: (state) => {
      state.list.map((item) => (item.checked = false));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsDataLength.fulfilled, (state, { payload }) => {
        state.length = payload;
      })

      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.list = payload;
        state.loading = false;
      })

      .addCase(deletePost.fulfilled, (state, { payload }) => {
        state.list = state.list.filter((post) => String(post.id) !== payload);
      })

      .addCase(deletePosts.fulfilled, (state, { payload }) => {
        state.list = state.list.filter((item) => !payload.includes(item.id));
      })

      .addCase(addNewPost.pending, (state) => {
        state.error = null;
      })

      .addCase(addNewPost.fulfilled, (state, { payload }) => {
        state.list.push(payload);
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

export const { togglePostItemChecked, clearChecked } = postSlice.actions;
export default postSlice.reducer;

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};
