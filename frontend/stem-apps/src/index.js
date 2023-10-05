import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Form from './Form';
import Complete from './Complete';
import reportWebVitals from './reportWebVitals';
import Navbar from "./Navbar"
import Home from './Home';
import Dashboard from './Dashboard';
import { useState } from 'react';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './not-found';

console.log("hello world"); 

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavWrapper/>,
    errorElement: <NotFound/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/form",
        element: <Form/>,
      },
      {
        path: "/complete",
        element: <Complete/>
      },
      {
        path: "/dash",
        element: <Dashboard/>
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
    <div className="bg-zinc-950">
      <UserContext.Provider value={{user: user, setUser: setUser, authOverlay: authOverlay, setAuthOverlay: setAuthOverlay}}>
        <Navbar/>
        <Outlet/>
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
