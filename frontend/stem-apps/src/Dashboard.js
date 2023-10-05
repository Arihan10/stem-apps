import { useState } from 'react';
import formService from './services/FormService';
import { Navigate, useNavigate } from 'react-router-dom';

function Dashboard()
{
    const [userData, setData] = useState(null); 

    useEffect(() => {
        // Define a function to fetch the data
        const fetchData = async () => {
          try {
            const response = await formService.getYourDataMethod(); // Replace with your actual Axios call method
            setData(response.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        // Call the fetch function
        fetchData();
      }, []); 

    return (
    <div className="bg-zinc-950 min-h-screen w-full items-center justify-center text-gray-200 flex flex-col">
        <h1 className="font-sg font-bold text-6xl md:text-9xl bg-gradient-to-r from-lime-300 to-teal-300 bg-clip-text text-transparent">ACCEPTED</h1>
        <p className="text-white font-sg text-4xl md:text-5xl">Congratulations!</p>
    </div>
    );
}

export default Dashboard;