import React, { useEffect, useState } from 'react'
import './instruction.css'
import InstructionsHtml from './instructions'
import { Route, useNavigate } from 'react-router-dom';
import { fetchExamDetails, fetchQuestions } from '../exam/mediator';
function Instruction() {
  const [agreeTOC, setAgreeTOC] = useState(false);
  const navigate = useNavigate()

  async function startExamHandler() {
    const detfetchstat = await fetchExamDetails();
    const qnfetchstat = await fetchQuestions();
    if (detfetchstat && qnfetchstat) {
      navigate('/exampage')
    }
    else {
      alert('ERROR : CONTACT INVIGILATOR IMMEDIATELY');
    }
  }

  return (
    <div className='instruction'>
      <div className='instructionpane'>
        <div className="titlebar">
          <h2 className='title'>Instructions</h2>
        </div>


        <div id='markdown-content' className='instructiondiv'>
          <InstructionsHtml />
        </div>
        <div className='instructionfooter'>
          <label><input type="checkbox" name="agree" id="agree" onChange={(e) => setAgreeTOC(!agreeTOC)} value={agreeTOC} /> Agree to Terms & Conditions and I have read Instructions </label>
          <button className='startexambtn' disabled={!agreeTOC} onClick={startExamHandler}>Start Exam</button>
        </div>
      </div>

      <div className="userpane">
        <img className='userimg' src="https://media.istockphoto.com/id/1177794485/vector/person-gray-photo-placeholder-woman.jpg?s=612x612&w=0&k=20&c=B41l9xgyu4bR63vPqt49mKZIRGh8ewpewN7zXnYPOsI=" alt="User Image" height={150} width={150} />
        <label className='applicantnameblack'>{sessionStorage.getItem('username')}</label>
      </div>

    </div>
  )
}

export default Instruction