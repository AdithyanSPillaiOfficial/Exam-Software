import React from 'react'
import './exampage.css'
import QuestionView from './questionview/questionview'

function ExamPage() {
  return (
    <div className='exampage'>
        <div className="examheader">
            <label>CSE Computer Science and Engineering</label>
        </div>
        <div className="examdiv">
            <div className="questionpane">
                <div className="subjectbar">
                    <div className="subject">
                        Computer Science
                    </div>
                </div>
                <div className="sectionandtime bordersimple">
                    <label className='titlesection'>Section</label>
                    <label className='timeleft'>Time Left : 00:00</label>
                </div>
                <div className="sections bordersimple">
                    <div className={"section"}>Data Structures  </div>
                    <div className={"section"+" "+"sectionoff"}>Operating Systems  </div>
                </div>
                <div className="questionnumbar bordersimple">
                    <label >Question Number : 1</label>
                </div>
                <QuestionView />
                <div className="controlbuttons">
                    <div>
                        <button className="normbtn">Mark for Review and Next</button>
                        <button className="normbtn">Clear Responce</button>
                    </div>
                    <button className='savenextbtn'>Save and Next</button>
                </div>
            </div>

            <div className="palattepane">

            </div>
        </div>

    </div>
  )
}

export default ExamPage