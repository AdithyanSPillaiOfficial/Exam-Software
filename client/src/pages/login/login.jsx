import React, { useEffect, useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import { useSocket } from '../../socketContext';
import { socket, connectSocket, disconnectSocket, connectionStatus, systemname } from "../../socket";
import { handleSubmit, handleVerify } from './auth';

function Login() {
  // const socket = useSocket();

  const navigate = useNavigate();

  const [systemName, setSystemName] = useState(systemname)
  const [permitLogin, setPermitLogin] = useState(false);
  const [userVarified, setUserVerified] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [userName, setUserName] = useState('Name')
  const [examName, setExamName] = useState('Disconnected');

  const [uname, setUname] = useState('');
  const [password, setPassword] = useState('')
  // const [reqFlag, setReqFlag] = useState(false);
  var reqFlag = false;

  useEffect(() => {

    if (reqFlag == false) {
      if (connectionStatus == false) { connectSocket(); }
      reqFlag = true;

      socket.on("connect", () => {
        console.log("Connected to socket server");
        socket.emit('registerSystem');
      });
    }

    socket.on("systemregistered", ({systemname, examname}) => {
      setSystemName(systemname);
      setExamName(examname);
      sessionStorage.setItem('examname',examname);
      setPermitLogin(true);
    });

    return () => {
      //disconnectSocket();
      //socket.off('connect');
    };
  }, []);

  async function loginHandler() {
    //navigate('/instruction');
    const userCred = {
      username: uname,
      password: password,
      sysname : systemName
    };
    if (userVarified) {
      const responce = await handleSubmit(userCred);
      if (responce != false && responce != 'error') {
        localStorage.setItem('isLogedIn', true);
        setLoginStatus(true);
        sessionStorage.setItem('logedIn', true);
        sessionStorage.setItem('sessionId', responce.sessionid);
        navigate('/instruction');
      }
      else {
        alert('Login Failed');
        console.log(status);
      }
    }
    else {
      const responce = await handleVerify(userCred);
      if (responce != false && responce != 'Exam Already Submitted') {
        sessionStorage.setItem('sessionId', responce.sessionId);
        sessionStorage.setItem('username', responce.name);
        setUserName(responce.name);
        setUserVerified(true);
        //navigate('/instruction');
      }
      else if (responce === 'Exam Already Submitted'){
        alert('Exam Already Submitted');
      }

      else {
        alert('User verification Failed');
        console.log(status);
      }
    }
  }

  return (
    <div>
      <div className='sysanduser'>
        <div className="sysinfo">
          <label className='normtext'>System name : </label>
          <label className="sysname">{systemName}</label>
          <label className='normtext'>Kindly Contact Invigilator for Any Help</label>
        </div>
        <div className="userinfo">
          <div className='userinfoinfo'>
            <label className="normtext">Name : </label>
            <label className="sysname">{userName}</label>
            <label className="normtext">Subject : <label style={{ color: '#f0f30e' }}>{examName}</label></label>
          </div>
          <div className='imagediv'>
            <img src="https://media.istockphoto.com/id/1177794485/vector/person-gray-photo-placeholder-woman.jpg?s=612x612&w=0&k=20&c=B41l9xgyu4bR63vPqt49mKZIRGh8ewpewN7zXnYPOsI=" alt="User Image" height={150} width={150} />
          </div>
        </div>
      </div>

      <div className='remindsection'>
        <div className="loginformtitlebar bordersimple">
          <label >Login</label>
        </div>
        <div className="formdiv bordersimple">
          <div className='inputdiv'>
            <div className='personicondiv bordersimple'><img src="https://drubinbarneslab.berkeley.edu/wp-content/uploads/2012/01/icon-profile.png" className='personicon' alt="" /></div>
            <input type="text" placeholder='1111' value={uname} onChange={(e) => setUname(e.target.value)} className='forminput bordersimple' />
          </div>

          <div className='inputdiv'>
            <div className='personicondiv bordersimple'><img src="https://cdn-icons-png.freepik.com/512/2893/2893425.png" className='personicon' alt="" /></div>
            <input type="password" placeholder='Password' disabled={userVarified ? false : true} value={password} onChange={(e) => setPassword(e.target.value)} className='forminput bordersimple' />
          </div>

          <div className="buttondiv">
            <button className='submitbtn' onClick={loginHandler} disabled={!permitLogin}>{userVarified ? 'Login' : 'Verify'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login