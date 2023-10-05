import { useNavigate } from "react-router-dom";

function Home()
{
    const nav = useNavigate(0);

    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="pb-80 flex flex-col items-center">
                <h1 className="font-sg font-bold text-6xl md:text-9xl text-white">
                    STEM
                </h1>
                <h2 className="text-white font-sg text-2xl tracking-[0.5em] -mt-3">
                    CLUB
                </h2>
                <button onClick={() => {nav('auth')}} type="button" className="font-sg text-white bg-gradient-to-br from-rose-600 to-orange-400 focus:ring-2 focus:outline-none transition-all duration-200 font-medium rounded-lg text-lg px-8 py-2 text-center mt-10">
                    APPLY
                </button>
            </div>
        </div>
    );
}

export default Home;