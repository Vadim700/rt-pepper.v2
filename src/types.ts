export type Post = {
  id: number;
  name: string;
  userId: number;
  title: string;
  body: string;
  checked: boolean;
};

export type PostState = {
  list: Post[];
  length: number[];
  loading: boolean;
  error: string | null;
};

export type Todo = {
  text: any;
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

export type TodoState = {
  list: Todo[];
  loading: boolean;
  error: string | null;
};

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export type UserState = {
  list: User[];
  loading: boolean;
  error: string | null;
};

export type Comment = {
  id: number;
  postId: number;
  email: string;
  body: string;
  name: string;
};

export type CommentState = {
  list: Comment[];
  loading: boolean;
  error: string | null;
};

export type FavoriteState = {
  list: number[];
};

export type Album = {
  userId: number;
  id: number;
  title: string;
  checked: boolean;
};

export type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export type AlbumsState = {
  list: Album[];
  photosList: any;
  loading: boolean;
  error: string | null;
  loadingPhotos: boolean;
  errorPhotos: string | null;
};

export interface FetchAlbumsParams {
  itemsPerPage: string;
  pageNumber: string;
}

export type FavoriteAlbumState = {
  list: number[];
};

export type PathUrls = { [key: string]: string }; // что-бы ни было в свойстве - то будет строка
