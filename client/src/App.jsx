import { useState } from 'react'
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

function App() {
  const [count, setCount] = useState(0)
  const isLogedIn = sessionStorage.getItem('isLogedIn');

  if ((screen.availHeight || screen.height - 30) <= window.innerHeight) {
    alert("Kiosk")
  }

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
    }
  ]);

  return (
    <>
      <div className='examnameheader'>Adithya Exam Browser</div>
      <RouterProvider router={router} />
    </>

  )
}

export default App
