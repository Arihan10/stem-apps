import { useState, useContext } from 'react';
import formService from './services/FormService';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '.';

function Complete()
{
  const context = useContext(UserContext)

  return (
    <div className="bg-zinc-950 min-h-screen w-full items-center justify-center text-gray-200 flex flex-col">
      <h1 className="font-sg font-bold text-7xl mb-3">Thank you!</h1>
      <p className="text-gray-400">Visit the dashboard to check your application status.</p>
    </div>
  );
}

export default Complete;