import { useState } from 'react';
import logo from './logo.svg';
import formService from './services/FormService';
import { Navigate, useNavigate } from 'react-router-dom';
import('preline')

function Dropdown({ id, options, answers, placeholder='', setSecondaryState }) {
  const [state, setState] = useState(placeholder);

  return (
    <div className="hs-dropdown max-w-fit mt-4">
      <button id="hs-dropdown-default" type="button" className="w-44 hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium shadow-sm align-middle focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all text-sm bg-slate-950 hover:bg-slate-800 border-gray-700 text-gray-200 hover:text-white focus:ring-offset-gray-800">
        {state}
        <svg className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-300" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] hs-dropdown-open:opacity-100 opacity-0 hidden z-10 mt-2 w-44 shadow-md rounded-lg p-2 bg-gray-900 border border-gray-700 divide-gray-700" aria-labelledby="hs-dropdown-default">
        {options.map(o => 
          <a key={o} onClick=
          {
            () => 
            {
              setState(o);
              if (setSecondaryState)
              {
                setSecondaryState(o);
              }
              let ans = o; 
              if (ans == "Yes") ans = true; 
              else if (o == "False") ans = false; 
              else if (o == "Marketing & Outreach") ans = 1; 
              else if (o == "Logistics & Finance") ans = 2; 
              else if (o == "Technology") ans = 3; 
              answers[id] = ans; 
            }
          }
          className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm focus:ring-2 focus:ring-blue-500 text-gray-400 hover:bg-gray-800 hover:text-gray-300" href="#">
            {o}
          </a>
        )}
      </div>
    </div>
  );
}

function TextResponse({id, answers, long, placeholder=''}) {
  return (
    long ?
      (<textarea onChange={e => {
        answers[id] = e.target.value;
      }} placeholder={placeholder} maxLength="390" className="mt-3 resize-none bg-slate-500/5 border-2 border-gray-800/20 rounded-lg py-2 px-4 focus:border-zinc-900 focus:outline-none focus:ring-0 transition-colors duration-300 h-48" />) :

      (<input onChange={e => {
        answers[id] = e.target.value;
      }} placeholder={placeholder} maxLength="60" className="mt-3 bg-slate-500/5 border-2 border-gray-800/20 rounded-lg py-2 px-4 focus:border-zinc-900 focus:outline-none focus:ring-0 transition-colors duration-300" />)
  );
}

function Question({ question, desc, response}) {
  return (
    <div className="py-8 px-7 text-gray-200 flex flex-col gap-2 w-full bg-black border-2 mb-2 rounded-xl border-zinc-900/50">
      <h1 className="font-bold text-2xl font-sg">{question}</h1>
      <p className="text-gray-300 font-sg">{desc}</p>
        {response}
    </div>
  );
}

function Form() {

  let answers = { }
  const [team, setTeam] = useState('')

  let nav = useNavigate()

  let form = [
    {
      question: "What is your first name?",
      description: "",
      response:
        <TextResponse long={false}
          id={"first"}
          answers={answers}
          placeholder='Enter name...'
        />,
    },
    {
      question: "What is your second name?",
      description: "",
      response:
        <TextResponse long={false}
          id={"last"}
          answers={answers}
          placeholder='Enter name...'
        />,
    },
    {
      question: "Have you ever attended an MLH hackathon before?",
      description: "",
      response:
        <Dropdown options={["Yes", "No"]}
          id={"q1"}
          placeholder={'Select'}
          answers={answers}
        />,
    },
    {
      question: "What event organizing experience do you have?",
      description: "",
      response:
        <TextResponse long={true}
          id={"q1"}
          answers={answers}
          placeholder='Enter explanation...'
        />,
    },
    {
      question: "What team are you interested in leading?",
      description: "If accepted, we will determine whether you are fit for an Executive Leader of Executive role.",
      response: 
        <Dropdown options={["Marketing & Outreach", "Logistics & Finance", "Technology"]}
          id={"team"}
          answers={answers}
          placeholder={'Select Team'}
          setSecondaryState={setTeam}
        />,
    },
    {
      team: "Marketing & Outreach",
      question: "Do you have experience managing any public facing social media?",
      description: "We need to know this for logistical reasons",
      response: 
        <TextResponse long={true}
          id={"t0q1"}
          answers={answers}
        />,
    },
    {
      team: "Marketing & Outreach",
      question: "Do you have experience with graphic design?",
      description: "We need to know this for logistical reasons",
      response: 
        <TextResponse long={true}
          id={"t0q2"}
          answers={answers}
        />,
    },
    {
      team: "Technology",
      question: "What technical experience do you have?",
      description: "List any related clubs, organizations, activities and projects, as well as knowledge of tech-based frameworkes, services and fields.",
      response: 
        <TextResponse long={true}
          id={"t1q1"}
          answers={answers}
        />,
    },
    {
      team: "Technology",
      question: "What teaching experience do you have?",
      description: "List any related organizations.",
      response: 
        <TextResponse long={true}
          id={"t1q2"}
          answers={answers}
        />,
    },
    {
      team: "Logistics & Finance",
      question: "Have you ever organized or helped organize an event?",
      description: "List any related organizations.",
      response: 
        <TextResponse long={true}
          id={"t2q1"}
          answers={answers}
        />,
    },
    {
      team: "Logistics & Finance",
      question: "If so, explain.",
      description: "Have you ever organized or helped organize an event?",
      response: 
        <TextResponse long={true}
          id={"t2q1a"}
          answers={answers}
        />,
    },
    {
      team: "Logistics",
      question: "Do you have experience doing accounting or finances?",
      description: "List any related organizations.",
      response: 
        <TextResponse long={true}
          id={"t2q2"}
          answers={answers}
        />,
    },
  ];

  const targetQuestions = form.filter(q => q.team == null || q.team === team);

  const list = targetQuestions.map(
    inquiry => <Question key={inquiry.question} question={inquiry.question} desc={inquiry.description} response={inquiry.response} />
    );

  const submit = () => {
    formService.Submit(answers);
    //nav('/complete');
  }

  return (
    <div className="bg-zinc-950 min-h-screen flex flex-row justify-center">
      <div className="bg-zinc-950 p-10 w-full md:w-9/12 max-w-6xl flex flex-col gap-5">
        <div className="py-5 px-7 text-gray-200 flex flex-col gap-2 w-full bg-black border-2 rounded-xl border-zinc-900">
          <h1 className="font-bold text-7xl font-sg">STEM CLUB</h1>
          <h2 className="text-gray-500"> Executive Applications</h2>
        </div>
        <div className="">
          {list}
        </div>

      <button onClick={() => submit()} className='button py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-sg'>
        Submit
      </button>
      </div>
    </div>
  );
}

export default Form;
