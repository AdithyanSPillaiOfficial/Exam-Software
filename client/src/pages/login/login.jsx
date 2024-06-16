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
    </div>
  )
}

export default Login