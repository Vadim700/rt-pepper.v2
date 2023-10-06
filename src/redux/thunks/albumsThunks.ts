import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album, FetchAlbumsParams } from '../../types';

type FetchAlbumsReturnType = Album[];

// fetch Albums
export const fetchAlbums = createAsyncThunk<
  FetchAlbumsReturnType, // возвращает
  FetchAlbumsParams, // получает
  { rejectValue: string }
>('albums/fetchAlbums', async (url, { rejectWithValue }) => {
  let limit = '';
  let page = '';

  if (url.itemsPerPage) {
    limit = url.itemsPerPage;
    page = url.pageNumber;
  }

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/albums?_page=${page}&_limit=${limit}`,
  );

  if (!response.ok) {
    return rejectWithValue('Server Error!');
  }

  const data = await response.json();

  const editData = data.map((item: Album) => ({
    ...item,
    checked: false,
  }));

  return editData;
});

// delete Album
export const deleteAlbumItem = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('', async (id, { rejectWithValue }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${id}`,
    {
      method: 'DELETE',
    },
  );

  if (!response.ok) {
    return rejectWithValue('cant delete this Album ');
  }

  return id;
});
