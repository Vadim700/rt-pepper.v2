import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Favorite = {
   title?: string;
   name?: string;
   body?: string;
   id: number;
   userId?: number;
};

type FavoriteState = {
   list: Favorite[];
};

const initialState: FavoriteState = {
   list: [],
};

const favoriteSlice = createSlice({
   name: 'favorites',
   initialState,
   reducers: {
      addFavorites: (state, action: PayloadAction<Favorite>) => {
         state.list.push(action.payload);
      },
      removeFavorite: (state, action: PayloadAction<Favorite>) => {
         state.list = state.list.filter(
            (item) => item.id !== action.payload.id,
         );
      },
      clearFavorites: (state) => {
         state.list = [];
      },
   },
});

export const { addFavorites, removeFavorite, clearFavorites } =
   favoriteSlice.actions;

export default favoriteSlice.reducer;
