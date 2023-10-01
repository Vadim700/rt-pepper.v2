import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FavoriteState = {
  list: number[];
};

const initialState: FavoriteState = {
  list: [],
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleSelectedFavorite: (state, { payload }: PayloadAction<number>) => {
      state.list.includes(payload)
        ? (state.list = state.list.filter((item) => item !== payload))
        : state.list.push(payload);
    },

    clearFavorites: (state) => {
      state.list.length = 0;
    },
  },
});

export const { clearFavorites, toggleSelectedFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
