import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import './index.css'
// import './home.css'
import { UserContext } from ".";

function Home()
{
    const nav = useNavigate(0);
    const context = useContext(UserContext)

    return (
        <div className="overflow-hidden w-full min-h-screen flex items-center justify-center">
            <CardEffect/>
            <div className="mainContent itemsCenter pb-[7rem] flex flex-col items-center">
              <div>
                <h1 className="font-sg font-bold text-6xl md:text-9xl bg-gradient-to-r from-lime-300 to-green-400 bg-clip-text text-transparent">
                    BEAR
                </h1>
                <h2 className="text-white font-sg capitalize font-bold text-3xl tracking-[0.4em] text-center">
                    HACKS
                </h2>
              </div>
                <button onClick={() => {
                    nav('./form'); 
                  }} type="button" className="font-sg pointer-events-auto text-white bg-green-500 focus:ring-2 focus:outline-none transition-all duration-200 font-medium rounded-lg text-lg px-12 py-3 text-center mt-10 hover:bg-green-400">
                    APPLY NOW!
                </button>
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

export default Home;