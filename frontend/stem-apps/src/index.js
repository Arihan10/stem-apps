import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Form from './Form';
import Complete from './Complete';
import reportWebVitals from './reportWebVitals';
import { Outlet } from "react-router-dom";

// router
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Form/>,
  },
  {
    path: "complete",
    element: <Complete/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Outlet />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
