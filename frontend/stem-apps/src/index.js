import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Form from './Form';
import Complete from './Complete';
import reportWebVitals from './reportWebVitals';
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"
import { useState } from 'react';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';

console.log("hello world"); 

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavWrapper/>,
    children: [
      {
        path: "/form",
        element: <Form/>,
      },
      {
        path: "complete",
        element: <Complete/>
      }
    ]
  },
]);

export const UserContext = React.createContext(null);
function NavWrapper()
{
  const [user, setUser] = useState(null);
  const [authOverlay, setAuthOverlay] = useState(false);
  
  return (
    <div>
      <UserContext.Provider value={{user: user, setUser: setUser, authOverlay: authOverlay, setAuthOverlay: setAuthOverlay}}>
        <Navbar/>
        <div className='pt-10'>
          <Outlet/>
        </div>
      </UserContext.Provider>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
