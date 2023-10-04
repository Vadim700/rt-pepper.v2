import React from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';

import { NotfoundPage } from '../pages/notfoundPage/NotfoundPage';
import { Layout } from './layout/component';
import { Todos } from '../pages/todos/Todos';
import { Albums } from '../pages/albums/Albums';
import { Posts } from '../pages/posts/Posts';
import { EditTodo } from '../pages/editTodo/EditTodo';
import { EditPost } from '../pages/editPost/EditPost';
import { fetchTodos } from '../redux/thunks/todoThunks';
import { fetchPosts } from '../redux/thunks/postsThunks';
import { fetchUsers } from '../redux/thunks/userThunks';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Posts />} />
      <Route path="/:id" element={<EditPost />} />
      <Route path="albums" element={<Albums />} />
      <Route path="todos/*" element={<Todos />} />
      <Route path="todos/:id" element={<EditTodo />} />
      <Route path="*" element={<NotfoundPage />} />
    </Route>,
  ),
);

export const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const itemsPerPage = useAppSelector((limit) => limit.topic.limit);
  const pageNumber = useAppSelector((page) => page.topic.pageNumber);

  React.useEffect(() => {
    dispatch(fetchTodos({ itemsPerPage, pageNumber }));
    dispatch(fetchPosts({ itemsPerPage, pageNumber }));
    dispatch(fetchUsers());
  }, [dispatch, itemsPerPage, pageNumber]);

  return <RouterProvider router={router} />;
};
