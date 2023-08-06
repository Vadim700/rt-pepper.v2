import ReactDOM from 'react-dom/client';
import './index.scss';
import { App } from './components/app';
import store, { persistor } from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement,
);
root.render(
   <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
         <App />
      </PersistGate>
   </Provider>,
);
