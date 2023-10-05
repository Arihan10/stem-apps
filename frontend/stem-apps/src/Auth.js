import { useContext, useEffect } from "react";
import { UserContext } from ".";
import { useNavigate } from "react-router-dom";

function Auth()
{
    

    return (
        <div className="w-full min-h-screen grid items-center justify-center">
                <div className="bg-zinc-900/20 rounded-lg p-10 w-[30rem] flex flex-col gap-5">
                    <h1 className="font-sg font-bold text-3xl md:text-4xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        Accounts
                    </h1>

                    <div>
                        <h1 className="font-sg text-gray-400 mb-1">Username</h1>
                        <input className="pl-3 w-full text-white bg-transparent py-2 border-2 border-zinc-900 rounded-lg"></input>
                    </div>
                    <div>
                        <h1 className="font-sg text-gray-400 mb-1">Password</h1>
                        <input type="password" className="pl-3 w-full text-white bg-transparent py-2 border-2 border-zinc-900 rounded-lg"></input>
                    </div>
                    <div className="flex flex-horizontal gap-5 justify-stretch text-white mt-2">
                        <button className="grow bg-zinc-900 hover:bg-green-800 duration-150 py-3 rounded-lg">Sign Up</button>
                        <button className="grow bg-zinc-900 hover:bg-green-800 duration-150 py-3 rounded-lg">Log In</button>
                    </div>
                </div>
        </div>
    );
}

export default Auth;