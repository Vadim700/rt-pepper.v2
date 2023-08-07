import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchTodos } from '../redux/slices/todoSlice';

import {
   Route,
   RouterProvider,
   createBrowserRouter,
   createRoutesFromElements,
} from 'react-router-dom';
import { NotfoundPage } from '../pages/notfoundPage/NotfoundPage';

import { Layout } from './layout/component';
import { Todos } from '../pages/todos/Todos';
import { Albums } from '../pages/albums/Albums';
import { Posts } from '../pages/posts/Posts';
import { fetchPosts } from '../redux/slices/postsSlice';
import { EditTodo } from '../pages/editTodo/EditTodo';
import { fetchUsers } from '../redux/slices/userSlice';

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<Layout />}>
         <Route index element={<Posts />} />
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

   useEffect(() => {
      dispatch(fetchTodos({ itemsPerPage, pageNumber }));
      dispatch(fetchPosts({ itemsPerPage, pageNumber }));
      dispatch(fetchUsers());
   }, [dispatch, itemsPerPage, pageNumber]);

   return <RouterProvider router={router} />;
};
