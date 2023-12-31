import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import topicSlice from './slices/topicSlice';
import todoSlice from './slices/todoSlice';
import postSlice from './slices/postsSlice';
import commentSlice from './slices/commentSlice';
import userSlice from './slices/userSlice';
import favoriteSlice from './slices/favoriteSlice';
import albumsSlice from './slices/albumsSlice';
import favoriteAlbumSlice from './slices/favoriteAlbumSlice';

const rootReducer = combineReducers({
  topic: topicSlice,
  todo: todoSlice,
  post: postSlice,
  album: albumsSlice,
  comment: commentSlice,
  user: userSlice,
  favorites: favoriteSlice,
  albumFavorites: favoriteAlbumSlice,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
