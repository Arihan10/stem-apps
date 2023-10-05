
function Home()
{
    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="pb-80 flex flex-col items-center space-y-8">
                <h1 className="font-sg font-bold text-6xl md:text-9xl bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent">
                    STEM
                </h1>
                <h2 className="text-white font-sg text-4xl md:text-5xl">
                    Club
                </h2>
                <button type="button" className="applyBtn text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-lg px-8 py-5 text-center mt-6">
                    APPLY
                </button>
            </div>
        </div>
    );
}

export default Home;