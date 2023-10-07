import { useContext, useEffect, useState } from 'react';
import formService from './services/FormService';
import { Navigate, useNavigate } from 'react-router-dom'; 
import userService from './services/UserService'; 
import { UserContext } from '.'; 

function ViewApplicationsPortal()
{
    const nav = useNavigate(); 

    const context = useContext(UserContext);
    const [applicationsData, setApps] = useState(null); 

    useEffect(() => {
        if (!context.user) // or some field ***
        {
            nav('../auth'); 
        }

        console.log(applicationsData); 

        const fetchData = async () => {
          try {
            const response = await userService.GetUserById(context.user._id);
            if (!(response.data.email == "sofwarearihan@gmail.com" || response.data.email == "noahj1947@gmail.com")) {
                nav('../#'); 
            }

            const appResponse = await formService.GetAllApplications(); 
            console.log(appResponse); 
            setApps(appResponse.data); 
            console.log("set"); 
          } catch (error) {
            console.error("Error fetching apps data:", error);
          }
        };
    
        // Call the fetch function
        fetchData();
    }, []); 

    function PreFormattedText({ children }) {
        return <pre className="whitespace-pre-line bg-slate-500/5 border-2 border-gray-800/20 rounded-lg py-2 px-4 mb-2">{children}</pre>;
    }
    
    function booleanToString(value) {
        return value ? 'true' : 'false';
    }
    
    function Question({ question, desc, response }) {
        return (
            <div className="bg-zinc-950/70 backdrop-blur-[7px] py-7 px-7 text-gray-200 flex flex-col gap-2 w-full bg-black border-2 mb-2 rounded-xl border-zinc-900/50">
                <h1 className="font-bold text-2xl font-sg">{question}</h1>
                <p className="text-gray-300 font-sg">{desc}</p>
                {response}
            </div>
        );
    }
    
    return (
        <div className="container mx-auto p-4 bg-zinc-950 min-h-screen flex flex-col justify-center pointer-events-auto">
            <div className="mainContent p-10 bg-zinc-950/10 backdrop-blur-[5px] w-full md:w-9/12 max-w-6xl flex flex-col gap-5">
                <div className="bg-zinc-950/70 backdrop-blur-[10px] py-5 px-7 text-gray-200 flex flex-col gap-2 w-full bg-black border-2 rounded-xl border-zinc-900">
                    <h1 className="font-bold text-7xl font-sg">Applications</h1>
                </div>
                <div className="flex flex-col gap-5">
                    {applicationsData?.apps.map((app, index) => (
                        <Question
                            question={`${app.user.first} ${app.user.last}`}
                            desc={app.user.email}
                            response={
                                <div className="flex flex-col gap-2">
                                    {app.team !== null && (
                                        <>
                                            <span>Team:</span>
                                            <PreFormattedText>{app.team}</PreFormattedText>
                                        </>
                                    )}
                                    <span>Attended MLH:</span>
                                    <PreFormattedText>{booleanToString(app.q1)}</PreFormattedText>
                                    {app.q2 !== null && (
                                        <>
                                            <span>What event organizing experience do you have?</span>
                                            <PreFormattedText>{app.q2}</PreFormattedText>
                                        </>
                                    )}
                                    {app.t0q1 && (
                                        <>
                                            <span>Do you have experience managing any public facing social media?</span>
                                            <PreFormattedText>{app.t0q1}</PreFormattedText>
                                        </>
                                    )}
                                    {app.t0q2 && (
                                        <>
                                            <span>Do you have experience with graphic design?</span>
                                            <PreFormattedText>{app.t0q2}</PreFormattedText>
                                        </>
                                    )}
                                    {app.t1q1 && (
                                        <>
                                            <span>What technical experience do you have?</span>
                                            <PreFormattedText>{app.t1q1}</PreFormattedText>
                                        </>
                                    )}
                                    {app.t1q2 && (
                                        <>
                                            <span>What teaching experience do you have?</span>
                                            <PreFormattedText>{app.t1q2}</PreFormattedText>
                                        </>
                                    )}
                                    {app.t2q1 && (
                                        <>
                                            <span>Have you ever spoken to or had any interaction with the school administration?</span>
                                            <PreFormattedText>{app.t2q1}</PreFormattedText>
                                        </>
                                    )}
                                    {app.t2q1a && (
                                        <>
                                            <span>Are you involved in an adminsitrative/leadership position in any other clubs/organizations?</span>
                                            <PreFormattedText>{app.t2q1a}</PreFormattedText>
                                        </>
                                    )}
                                    {app.t2q2 && (
                                        <>
                                            <span>Do you have experience doing accounting or finances?</span>
                                            <PreFormattedText>{app.t2q2}</PreFormattedText>
                                        </>
                                    )}
                                    {app.date && (
                                        <>
                                            <span>Date:</span>
                                            <PreFormattedText>{new Date(app.date).toLocaleDateString()}</PreFormattedText>
                                        </>
                                    )}
                                </div>
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    ); 
}

export default ViewApplicationsPortal;