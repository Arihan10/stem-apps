import React from "react";
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="px-12 py-8 text-4xl text-white">
        <button onClick={() => navigate('/')}
        className="border-2 px-3 py-2 rounded-md border-zinc-900 transition-all duration-200 hover:scale-110">&lt;-</button>
      </div>
      <div className="mt-[30vh] flex flex-col items-center justify-center"> {/* base div */}
        <h1 className="text-9xl text-white">404</h1>
        <pre className='text-white/50'><i>Page Not Found!</i></pre>
      </div>
    </div>
  )
}
