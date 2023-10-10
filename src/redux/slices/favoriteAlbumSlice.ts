import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteAlbumState } from '../../types';

const initialState: FavoriteAlbumState = {
  list: [],
};

const favoriteAlbumSlice = createSlice({
  name: 'albumFavorites',
  initialState,
  reducers: {
    addAlbumToFavorites: (state, { payload }: PayloadAction<number[]>) => {
      state.list = [...state.list, ...payload];
    },

    toggleSelectedAlbumFavorite: (
      state,
      { payload }: PayloadAction<number>,
    ) => {
      state.list.includes(payload)
        ? (state.list = state.list.filter((item) => item !== payload))
        : state.list.push(payload);
    },

    clearAlbumFavorites: (state) => {
      state.list.length = 0;
    },
  },
});

export const {
  addAlbumToFavorites,
  toggleSelectedAlbumFavorite,
  clearAlbumFavorites,
} = favoriteAlbumSlice.actions;

export default favoriteAlbumSlice.reducer;
