import { useContext, useEffect, useState } from 'react';
import formService from './services/FormService';
import { Navigate, useNavigate } from 'react-router-dom'; 
import userService from './services/UserService';
import { UserContext } from '.'; 

function UserInfo()
{
    const nav = useNavigate(); 

    const context = useContext(UserContext);
    const [userData, setUser] = useState(null); 

    useEffect(() => {
        if (!context.user) // or some field ***
        {
            nav('../auth'); 
        }

        const fetchData = async () => {
          try {
            const response = await userService.GetUserById(context.user._id); 
            setUser(response.data); 
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        // Call the fetch function
        fetchData();
      }, []); 

    return (
        <div className="pb-[10rem] bg-zinc-950 min-h-screen w-full items-center justify-center text-gray-200 flex flex-col">
            <h1 className="font-sg font-bold text-6xl md:text-9xl bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent animate-pulse">COMING SOON...</h1>
            <p className="text-white font-sg text-4xl md:text-5xl animate-pulse">Bro we made this in 72hrs start to finish</p>
    </div>
    );
}

export default UserInfo;