import { Navigate, useNavigate } from 'react-router-dom';

function Home()
{
    let nav = useNavigate()

    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="pb-80 flex flex-col items-center space-y-8">
                <h1 className="font-sg font-bold text-6xl md:text-9xl bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent">
                    STEM
                </h1>
                <h2 className="text-white font-sg text-4xl md:text-5xl">
                    Club
                </h2>
                <button type="button" className="applyBtn text-white bg-gradient-to-br from-blue-500 to-green-500 hover:bg-gradient-to-bl hover:scale-105 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-green-800 font-bold rounded-lg text-2xl px-10 py-4 text-center mt-8 transition-transform duration-200 animate-pulse" onClick={nav('/form')}>
                    APPLY
                </button>
            </div>
        </div>
    );
}

export default Home;