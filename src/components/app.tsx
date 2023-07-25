import React from 'react';
import { useEffect } from 'react';

import { Header } from './header/component';
import { Footer } from './footer/component';
import { Body } from './body/component';

import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchTodos } from '../redux/slices/todoSlice';

export const App = (): JSX.Element => {
   const dispatch = useAppDispatch();
   const itemsPerPage = useAppSelector((limit) => limit.topic.limit);
   const pageNumber = useAppSelector((page) => page.topic.pageNumber);
   const bodyState = useAppSelector((state) => state.topic.topic);
   const { loading, error } = useAppSelector((state) => state.todo);

   useEffect(() => {
      dispatch(fetchTodos({ itemsPerPage, pageNumber }));
   }, [dispatch, itemsPerPage, pageNumber, bodyState]);

   return (
      <div className="App container">
         <Header />
         {loading ? <h2>is Loading...</h2> : <Body />}
         {error && <h2>Error!</h2>}
         <Footer />
      </div>
   );
};
