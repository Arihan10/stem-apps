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
    }; 

    const redirLogin = () => {
        nav('../auth'); 
    }

    return (
        <div className="w-full min-h-screen grid items-center justify-center">
                <div className="bg-zinc-900/20 rounded-lg p-10 w-[17rem] md:w-[30rem] flex flex-col gap-5">
                    <h1 className="font-sg font-bold text-3xl md:text-4xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        Sign Up
                    </h1>

                    <div>
                        <h1 className="font-sg text-gray-400 mb-1">Email</h1>
                        <input 
                            className="pl-3 w-full text-white bg-transparent py-2 border-2 border-zinc-900 rounded-lg"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <h1 className="font-sg text-gray-400 mb-1">First Name</h1>
                        <input 
                            className="pl-3 w-full text-white bg-transparent py-2 border-2 border-zinc-900 rounded-lg"
                            value={first}
                            onChange={e => setFirst(e.target.value)}
                        />
                    </div>
                    <div>
                        <h1 className="font-sg text-gray-400 mb-1">Last Name</h1>
                        <input 
                            className="pl-3 w-full text-white bg-transparent py-2 border-2 border-zinc-900 rounded-lg"
                            value={last}
                            onChange={e => setLast(e.target.value)}
                        />
                    </div>
                    <div>
                        <h1 className="font-sg text-gray-400 mb-1">Password</h1>
                        <input 
                        type="password" 
                        className="pl-3 w-full text-white bg-transparent py-2 border-2 border-zinc-900 rounded-lg"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    </div>
                    <div className="flex flex-horizontal gap-5 justify-stretch text-white mt-2">
                        <button
                        className="grow bg-zinc-900 hover:bg-green-800 duration-150 py-3 rounded-lg"
                        onClick={handleSignup}
                        >
                            Sign Up
                        </button>
                        <button 
                            className="grow bg-zinc-900 hover:bg-green-800 duration-150 py-3 rounded-lg"
                            onClick={redirLogin}
                        >
                            Log In
                        </button>
                    </div>
                </div>
        </div>
    );
}

export default Auth;