import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  deleteAlbumItem,
  deleteAlbumItems,
  fetchAlbums,
  fetchPhotos,
} from '../thunks/albumsThunks';
import { AlbumsState } from '../../types';

const initialState: AlbumsState = {
  list: [],
  photosList: [],
  loading: false,
  error: null,
};

export const albumsSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    toggleAlbumItemChecked: (state, { payload }: PayloadAction<number>) => {
      const editedAlbum = state.list.find((item) => item.id === payload);
      if (editedAlbum) {
        editedAlbum.checked = !editedAlbum.checked;
      }
    },

    clearChecked: (state) => {
      state.list.map((item) => (item.checked = false));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAlbums.fulfilled, (state, { payload }) => {
        state.list = payload;
      })

      .addCase(deleteAlbumItem.fulfilled, (state, { payload }) => {
        state.list = state.list.filter((item) => String(item.id) !== payload);
      })

      .addCase(deleteAlbumItems.fulfilled, (state, { payload }) => {
        state.list = state.list.filter((item) => !payload.includes(item.id));
      })

      .addCase(fetchPhotos.fulfilled, (state, { payload }) => {
        state.photosList = payload;
      })

      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { toggleAlbumItemChecked, clearChecked } = albumsSlice.actions;

export default albumsSlice.reducer;

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};
