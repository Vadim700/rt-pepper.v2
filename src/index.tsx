import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { App } from './components/app';
import store from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement,
);
root.render(
   <Provider store={store}>
      <App />
   </Provider>,
);
