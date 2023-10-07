import { useContext, useEffect, useState } from "react";
import { UserContext } from ".";
import { useNavigate } from "react-router-dom";
import userService from "./services/UserService";

function Auth()
{
    const [email, setEmail] = useState(''); 
    const [first, setFirst] = useState(''); 
    const [last, setLast] = useState(''); 
    const [password, setPassword] = useState(''); 
    const context = useContext(UserContext);

    const nav = useNavigate(); 

    useEffect(() => {
        // emptiness
    }, [])

    const handleSignup = () => {
        // console.log("Email:", email);
        // console.log("Password:", password);
        const user = {
            email: email, 
            first: first, 
            last: last,
            password: password,
        }
        const response = userService.SignUp(user); 
        if (response.error == null) nav('../auth'); 
    }; 

    const redirLogin = () => {
        nav('../auth'); 
    }

    return (
        <div className="w-full min-h-screen grid items-center justify-center">
            <CardEffect />
            <div className="mainContent bg-zinc-950/70 backdrop-blur-[7px] rounded-lg p-10 w-[17rem] md:w-[30rem] flex flex-col gap-5">
                <h1 className="font-sg font-bold text-3xl md:text-4xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    Sign Up
                </h1>

                <div>
                    <h1 className="font-sg text-gray-400 mb-1">Email</h1>
                    <input 
                        className="pl-3 w-full text-white bg-transparent py-2 border-2 border-zinc-900 rounded-lg pointer-events-auto"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <h1 className="font-sg text-gray-400 mb-1">First Name</h1>
                    <input 
                        className="pl-3 w-full text-white bg-transparent py-2 border-2 border-zinc-900 rounded-lg pointer-events-auto"
                        value={first}
                        onChange={e => setFirst(e.target.value)}
                    />
                </div>
                <div>
                    <h1 className="font-sg text-gray-400 mb-1">Last Name</h1>
                    <input 
                        className="pl-3 w-full text-white bg-transparent py-2 border-2 border-zinc-900 rounded-lg pointer-events-auto"
                        value={last}
                        onChange={e => setLast(e.target.value)}
                    />
                </div>
                <div>
                    <h1 className="font-sg text-gray-400 mb-1">Password</h1>
                    <input 
                    type="password" 
                    className="pl-3 w-full text-white bg-transparent py-2 border-2 border-zinc-900 rounded-lg pointer-events-auto"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                </div>
                <div className="flex flex-horizontal gap-5 justify-stretch text-white mt-2">
                    <button
                    className="grow bg-zinc-900 hover:bg-green-800 duration-150 py-3 rounded-lg pointer-events-auto"
                    onClick={handleSignup}
                    >
                        Sign Up
                    </button>
                    <button 
                        className="grow bg-zinc-900 hover:bg-green-800 duration-150 py-3 rounded-lg pointer-events-auto"
                        onClick={redirLogin}
                    >
                        Log In
                    </button>
                </div>
            </div>
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

export default Auth;