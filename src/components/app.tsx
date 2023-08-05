import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchTodos } from '../redux/slices/todoSlice';

import { Routes, Route } from 'react-router-dom';
import { NotfoundPage } from '../pages/notfoundPage/component';

import { Layout } from './layout/component';
import { Todos } from '../pages/todos/component';
import { Albums } from '../pages/albums/components';
import { Posts } from '../pages/posts/component';
import { fetchPosts } from '../redux/slices/postsSlice';
import { CreateTodo, createTodoAction } from '../pages/createPost/component';

export const App = (): JSX.Element => {
   const dispatch = useAppDispatch();
   const itemsPerPage = useAppSelector((limit) => limit.topic.limit);
   const pageNumber = useAppSelector((page) => page.topic.pageNumber);

   useEffect(() => {
      dispatch(fetchTodos({ itemsPerPage, pageNumber }));
      dispatch(fetchPosts({ itemsPerPage, pageNumber }));
   }, [dispatch, itemsPerPage, pageNumber]);

   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route index element={<Posts />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/todos" element={<Todos />} />
            <Route
               path="/todos/new"
               element={<CreateTodo />}
               action={createTodoAction}
            />
            <Route path="*" element={<NotfoundPage />} />
         </Route>
      </Routes>
   );
};
