import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Instruction from './pages/instructions/Instruction';
import Login from './pages/login/login';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ExamPage from './pages/exam/exampage';
import { SocketProvider } from './socketContext';
import Dashboard from './pages/dashboard/dashboard';

function App() {
  const [count, setCount] = useState(0)
  const isLogedIn = sessionStorage.getItem('isLogedIn');

//   useEffect(() => {
//     const handleContextmenu = e => {
//         e.preventDefault()
//         alert("Warning : Donot rightclick in this window")
//     }
//     document.addEventListener('contextmenu', handleContextmenu)
//     return function cleanup() {
//         document.removeEventListener('contextmenu', handleContextmenu)
//     }
// }, [ ])

  // if ((screen.availHeight || screen.height - 30) <= window.innerHeight) {
    
  // }
  // else {
  //   alert("Please turn on Kiosk mode")
  // }
  
  // else {
  //   return (
  //     <div><h1>Please Open The App in Kiosk Mode</h1></div>
  //   )
  // }

  var homepage;
  if (isLogedIn) {
    homepage = {
      path: '/',
      element: <Instruction />
    }
  }
  else {
    homepage = {
      path: '/',
      element: <Login />
    }
  }

  const router = createBrowserRouter([
    homepage,
    {
      path: "/login",
      element: <Login />,
      children: [
        {
          path: '/login/inst',
          element: <Instruction />
        },
        {
          path: '/login/login',
          element: <Login />
        },
      ]
    },
    {
      path: "/dashboard",
      element: <Dashboard />
    },
    {
      path: "/instruction",
      element: <Instruction />
    },
    {
      path : '/exampage',
      element : <ExamPage />
    }
  ]);

  return (
    <>
      {/* <SocketProvider> */}
        <div className='examnameheader'>Adithya Exam Browser</div>
        <RouterProvider router={router} />
      {/* </SocketProvider> */}
    </>

  )
}

export default App
