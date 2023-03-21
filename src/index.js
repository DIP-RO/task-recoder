import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import UserContext from './Context/UserContext';
import {
 
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import taskReducer from './Features/Tasks'

const store = configureStore({
  reducer: {
   tasks : taskReducer
  }
})

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContext>
        <Provider store={store}>
          <App />
        </Provider>
      </UserContext>
    </QueryClientProvider>


  </React.StrictMode>
);


// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
