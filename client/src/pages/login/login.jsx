import React, { useEffect, useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import { useSocket } from '../../socketContext';
import { socket, connectSocket, disconnectSocket, connectionStatus, systemname } from "../../socket";

function Login() {
  // const socket = useSocket();

  const navigate = useNavigate();

  const [systemName, setSystemName] = useState(systemname)
  const [permitLogin, setPermitLogin] = useState(false);
  // const [reqFlag, setReqFlag] = useState(false);
  var reqFlag = false;

  useEffect(() => {

    if (reqFlag == false) {
      if(connectionStatus == false ){connectSocket();}
      reqFlag = true;

      socket.on("connect", () => {
        console.log("Connected to socket server");
        socket.emit('registerSystem');
      });
    }

    socket.on("systemregistered", (sysname) => {
      setSystemName(sysname);
      setPermitLogin(true);
    });

    return () => {
      //disconnectSocket();
      //socket.off('connect');
    };
  }, []);

  function loginHandler() {
    navigate('/instruction');
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
            <label className="sysname">Name</label>
            <label className="normtext">Subject : <label style={{ color: '#f0f30e' }}>KEAM</label></label>
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
            <input type="text" placeholder='1111' className='forminput bordersimple' />
          </div>

          <div className='inputdiv'>
            <div className='personicondiv bordersimple'><img src="https://cdn-icons-png.freepik.com/512/2893/2893425.png" className='personicon' alt="" /></div>
            <input type="password" placeholder='Password' className='forminput bordersimple' />
          </div>

          <div className="buttondiv">
            <button className='submitbtn' onClick={loginHandler} disabled={!permitLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login