import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import Form from './Form';
import Complete from './Complete';
import reportWebVitals from './reportWebVitals';
import Navbar from "./Navbar"
import Home from './Home';
import Dashboard from './Dashboard';
import Auth from './Auth';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './not-found';
import Signup from './Signup';
import UserInfo from './UserInfo';

const router = createBrowserRouter([
  {
    path: "/stem-apps",
    element: <NavWrapper/>,
    errorElement: <NotFound/>,
    children: [
      {
        path: "",
        element: <Home/>,
        errorElement: <NotFound/>,
      },
      {
        path: "form",
        element: <Form/>,
        errorElement: <NotFound/>,
      },
      {
        path: "complete",
        element: <Complete/>,
        errorElement: <NotFound/>,
      },
      {
        path: "dash",
        element: <Dashboard/>,
        errorElement: <NotFound/>,
      },
      {
        path: "auth",
        element: <Auth/>,
        errorElement: <NotFound/>,
      },
      {
        path: "signup",
        element: <Signup/>,
        errorElement: <NotFound/>,
      },
      {
        path: "info",
        element: <UserInfo/>,
        errorElement: <NotFound/>
      }
    ]
  },
]);

export const UserContext = React.createContext(null);
function NavWrapper()
{
  const [user, setUser] = useState();
  const [authOverlay, setAuthOverlay] = useState(false);
  
  return (
    <div className="bg-zinc-950">
      <UserContext.Provider value={{user, setUser}}>
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
