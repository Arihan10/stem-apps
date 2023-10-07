import { useContext, useEffect, useState } from 'react';
import formService from './services/FormService';
import { Navigate, useNavigate } from 'react-router-dom'; 
import userService from './services/UserService';
import { UserContext } from '.';

let user = {
    "_id": "651cf8c9d80230379adb466c"
}

function Dashboard()
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
            { userData === null ? (
                <>
                    <h1 className="font-sg font-bold text-6xl md:text-9xl bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent animate-pulse">LOADING...</h1>
                    <p className="text-white font-sg text-4xl md:text-5xl animate-pulse">Loading...</p>
                </>
            ) : userData.status === "accepted" ? (
                <>
                    <h1 className="font-sg font-bold text-6xl md:text-9xl bg-gradient-to-r from-lime-300 to-teal-300 bg-clip-text text-transparent">ACCEPTED</h1>
                    <p className="text-white font-sg text-4xl md:text-5xl">Congratulations!</p>
                </>
            ) : userData.status === "rejected" ? (
            <>
                <h1 className="font-sg font-bold text-6xl md:text-9xl bg-gradient-to-r from-red-500 to-amber-300 bg-clip-text text-transparent">REJECTED</h1>
                <p className="text-white font-sg text-4xl md:text-5xl">RIP bro it gets better just trust me</p>
            </>
            ) : userData.status == "pending" ? (
            <>
                <h1 className="font-sg font-bold text-6xl md:text-9xl bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent animate-pulse">PENDING DECISION</h1>
                <p className="text-white font-sg text-4xl md:text-5xl animate-pulse">Results will be available here soon. Stay tuned!</p>
            </>
            ) : userData.status == "applying" ? (
            <>
                <h1 className="font-sg font-bold text-6xl md:text-9xl bg-gradient-to-r from-red-500 to-amber-300 bg-clip-text text-transparent animate-pulse">APPLYING</h1>
                <p className="text-white font-sg text-4xl md:text-5xl">Due October 12th, 11:59 PM</p>
            </>
            ) : null }
        </div>
    );
}

function CardEffect() {
    const nav = useNavigate(0);

    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const [randomText, setRandomText] = useState("");

    const handleOnMove = (e, ref) => {
        const rect = ref.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;
            
        setRandomText(Array.from(Array(15000)).map(() => chars[Math.floor(Math.random() * (chars.length - 1))]).join(""));
        
        const letters = ref.querySelector(".card-letters");
        letters.style.setProperty("--x", `${x}px`);
        letters.style.setProperty("--y", `${y}px`);
    }

    return (
        <div className="overflow-hiddden card-track">
        <div className="overflow-hidden card-wrapper">
            <div className="card" onMouseMove={(e) => handleOnMove(e, e.currentTarget)}>
            <div className="card-image">
                
            </div>
            <div className="card-gradient"></div>
            <div className="card-letters">{randomText}</div>
            </div>
            <div className="card-corners">
            <span className="card-corner"></span>
            <span className="card-corner"></span>
            <span className="card-corner"></span>
            <span className="card-corner"></span>
            </div>
        </div>
        </div>
    );
}

export default Dashboard;