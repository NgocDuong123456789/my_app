import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools'
import {Provider}  from 'react-redux';
// import {store} from './Store'
import {
 
  QueryClient,
  QueryClientProvider,
} from 'react-query'
 const queryClient = new QueryClient({
  // khi mình chuyển qua trang thì api không cập nhật lại 
  defaultOptions:{
    queries:{
      refetchInterval:false
    }
  }
 })
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
    
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </BrowserRouter>

    
    {/* </Provider> */}
   
  </React.StrictMode>
);
