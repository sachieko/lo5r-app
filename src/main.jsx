import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import ErrorPage from './routes/ErrorPage.jsx';
import { Index } from './routes/index.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          { 
            path: 'lore/:loreId',
            element: <div>lore placeholder</div>,
          },
          { 
            path: 'rules/:ruleId',
            element: <div>rule placeholder</div>,
          },
          { 
            path: 'questions/:questionId',
            element: <div>question placeholder</div>,
          }
        ]
      }
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
