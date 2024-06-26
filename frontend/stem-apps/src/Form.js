import { useState, useContext, useEffect } from 'react';
import { UserContext } from '.';
import logo from './logo.svg';
import formService from './services/FormService';
import { Navigate, useNavigate } from 'react-router-dom';

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

/*let user = {
  "_id": "651cf8c9d80230379adb466c",
  "email": "sofwarearihan@gmail.com",
  "first": "Arihan",
  "last": "Sharma",
}*/

let answers = {
  "user_id": "",
  "q1": "",
  "q2": "",
  "q3": "",
}


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


function Dropdown({ id, options, answers, placeholder = '', setSecondaryState }) {
  const [state, setState] = useState(placeholder);

  const opJSX = options.map(o =>
    <Menu.Item>
      {({ active }) => (
        <a
          href="#"
          className={classNames(
            active ? 'bg-gray-800 text-gray-100' : 'text-gray-200',
            'block px-4 py-2 text-sm'
          )}
          onClick=
          {
            () => {
              setState(o);
              if (setSecondaryState) {
                setSecondaryState(o);
              }
              let ans = o;
              if (ans == "Yes") ans = true;
              else if (o == "No") ans = false;
              else if (o == "Marketing & Outreach") ans = 0;
              else if (o == "Logistics & Finance") ans = 1;
              else if (o == "Technology") ans = 2;
              answers[id] = ans;
            }
          }
        >
          {o}
        </a>
      )}
    </Menu.Item>
  )

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left pointer-events-auto pb-20">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-zinc-950 px-3 py-2 text-sm font-semibold text-white-900 shadow-sm ring-1 ring-inset ring-gray-900 hover:bg-gray-900">
            {state}
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 z-[999] mt-2 w-56 origin-top-left divide-y divide-gray-800 rounded-md bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {opJSX}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

function TextResponse({ id, answers, long, placeholder = '' }) {
  return (
    long ?
      (<textarea onChange={e => {
        answers[id] = e.target.value;
      }} placeholder={placeholder} className="mt-3 resize-none bg-slate-500/5 border-2 border-gray-800/20 rounded-lg py-2 px-4 focus:border-zinc-900 focus:outline-none focus:ring-0 transition-colors duration-300 h-48 pointer-events-auto" />) :

      (<input onChange={e => {
        answers[id] = e.target.value;
      }} placeholder={placeholder} className="mt-3 bg-slate-500/5 border-2 border-gray-800/20 rounded-lg py-2 px-4 focus:border-zinc-900 focus:outline-none focus:ring-0 transition-colors duration-300 pointer-events-auto" />)
  );
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

function Form() {
  const nav = useNavigate();

  const [team, setTeam] = useState('')
  // const [submitted, setSubmitted] = useState(false); 
  const context = useContext(UserContext)
  console.log(context.user)

  useEffect(() => {
    async function fetchUserInfo() {
      let response = await formService.FormsSubmittedNumber(context.user._id); 
      if (response > 0) nav('../dash'); 
    }

    if (!context.user) // or some field ***
    {
      nav('../auth');
    } else {
      fetchUserInfo(); 
    }
  }, [])

  useEffect(() => {
    if (!context.user) // or some field ***
    {
      nav('../auth');
    }
  })

  let form = [
    {
      question: "How many hackathons have you attended before?",
      description: "Past experience with hackathons.",
      response:
        <Dropdown options={["0", "1-2", "2-4", "5+"]}
          id={"q1"}
          placeholder={'Select'}
          answers={answers}
        />,
    },
    {
      question: "What are you most excited to do at BearHacks?",
      description: "Make the most of bearhacks!",
      response:
        <TextResponse long={true}
          id={"q2"}
          answers={answers}
          placeholder='Enter explanation...'
        />,
    },
    {
      question: "What is your favourite BEAR species?",
      description: "Be creative with your response!",
      response:
        <TextResponse long={true}
          id={"q3"}
          answers={answers}
          placeholder='Enter explanation...'
        />,
    },
  ];

  const targetQuestions = form.filter(q => q.team == null || q.team === team);

  const list = targetQuestions.map(
    inquiry => <Question key={inquiry.question} question={inquiry.question} desc={inquiry.description} response={inquiry.response} />
  );

  const submit = () => {
    answers["user_id"] = context.user._id; 
    console.log(answers);
    formService.Submit(answers);
    nav('../complete');
    //this.props.history.push('/complete')
  }

  return (
    <div className="ourForm bg-zinc-950 min-h-screen flex flex-row justify-center pointer-events-auto">
      <CardEffect />
      <div className="mainContent p-10 bg-zinc-950/10 backdrop-blur-[5px] w-full md:w-9/12 max-w-6xl flex flex-col gap-5">
        <div className="bg-zinc-950/70 backdrop-blur-[10px] py-5 px-7 text-gray-200 flex flex-col gap-2 w-full bg-black border-2 rounded-xl border-zinc-900">
          <h1 className="font-bold text-7xl font-sg">BEAR HACKS</h1>
          <h2 className="text-gray-500">Applications</h2>
        </div>
        <div className="flex flex-col gap-5">
          {list}
        </div>
        <button onClick={() => submit()} className='button py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-sg pointer-events-auto'>
          Submit
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

    setRandomText(Array.from(Array(20000)).map(() => chars[Math.floor(Math.random() * (chars.length - 1))]).join(""));

    const letters = ref.querySelector(".card-letters");
    letters.style.setProperty("--x", `${x}px`);
    letters.style.setProperty("--y", `${y}px`);
  }

  return (
    <div className="overflow-hiddden card-track">
      <div className="overflow-hidden card-wrapper">
        <div className="card2" onMouseMove={(e) => handleOnMove(e, e.currentTarget)}>
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

export default Form;
