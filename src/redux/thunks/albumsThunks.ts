import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album, AlbumsState, FetchAlbumsParams, Photo } from '../../types';

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

// fetchPhotos
export const fetchPhotos = createAsyncThunk<
  Album[],
  string,
  { rejectValue: string }
>('comment/fetchPhotos', async (id, { rejectWithValue }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos?albumId=${id}`,
  );

  if (!response.ok) {
    return rejectWithValue('Server Error!');
  }

  const data = await response.json();

  return data;
});

// delete Album
export const deleteAlbumItem = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('albums/deleteAlbumItem', async (id, { rejectWithValue }) => {
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

// delete some Albums
export const deleteAlbumItems = createAsyncThunk<
  any, // >>>
  number[], // <<<
  { rejectValue: string }
>('albums/deleteAlbumItems', async (ids, { rejectWithValue }) => {
  const promises = ids.map(async (id) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${id}`,
      { method: 'DELETE' },
    );

    if (!response.ok) {
      return rejectWithValue(`Can't delete post with ID: ${id}`);
    }

    return id;
  });

  const result = await Promise.all(promises);

  return result;
});

// edit Albums
export const editAlbum = createAsyncThunk<
  Album,
  any,
  { rejectValue: string; state: { album: AlbumsState } }
>('albums/editAlbum', async (obj, { rejectWithValue, getState }) => {
  const { id, title } = obj;

  const editedAlbumTitle = getState().album.list.find(
    (item) => String(item.id) === id,
  );

  if (editedAlbumTitle) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
        }),
      },
    );
    if (!response.ok) {
      return rejectWithValue('Can"t edit album title');
    }
    return (await response.json()) as Album;
  }
  return rejectWithValue('Ooops!.. ;)');
});
