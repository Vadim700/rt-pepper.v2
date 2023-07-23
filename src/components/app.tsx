import React from 'react';
import { useEffect } from 'react';

import { Header } from './header/component';
import { Footer } from './footer/component';
import { Body } from './body/component';

import { useAppDispatch } from '../hooks';
import { fetchTodos } from '../redux/slices/todoSlice';

export const App = (): JSX.Element => {
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchTodos());
   }, [dispatch]);

   return (
      <div className="App container">
         <Header />
         <Body />
         <Footer />
      </div>
   );
};
