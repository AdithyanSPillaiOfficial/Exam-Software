import React from 'react'
import './login.css'
function Login() {
  return (
    <div>
      <div className='sysanduser'>
        <div className="sysinfo">
          <label className='normtext'>System name : </label>
          <label className="sysname">C001</label>
          <label className='normtext'>Kindly Contact Invigilator for Any Help</label>
        </div>
        <div className="userinfo">
          <div className='userinfoinfo'>
            <label className="normtext">Name : </label>
            <label className="sysname">Name</label>
            <label className="normtext">Subject : <label style={{color: '#f0f30e'}}>KEAM</label></label>
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
            <button className='submitbtn'>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login