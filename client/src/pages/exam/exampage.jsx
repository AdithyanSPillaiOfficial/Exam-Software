import React, { useEffect, useState } from 'react'
import './exampage.css'
import QuestionView from './questionview/questionview'
import { useNavigate } from 'react-router-dom';
import { socket, connectSocket, disconnectSocket, connectionStatus } from "../../socket";
import { sampleqn } from './sampleqn';
import { examQuestions, examdetails, sessiondetails } from './mediator';
import { saveAnswertoDB } from './saveanswertodb';
var i = 0;

function ExamPage() {
    const navigate = useNavigate();

    const qnSections = examdetails.sections;
    const questions = examQuestions;
    const [sectionIndicator, setSectionIndicator] = useState(0);

    function updateSection(index) {
        setSectionIndicator(index);
    }

    useEffect(() => {
      handleTileClick(0);
    }, [sectionIndicator])
    


    const sectionQuestion = questions[sectionIndicator];
    const [qnNum, setQnNum] = useState(1);
    const [currentQn, setCurrentQn] = useState(sectionQuestion[0])
    sectionQuestion[0].visited = true;

    function handleExamSubmit() {
        navigate('/login');
    }

    

    const initialTime = sessiondetails.timeleft;
    if(initialTime < 0) {alert("Session Expired"); handleExamSubmit();}
    const [seconds, setSeconds] = useState(initialTime*60);

    // Function to decrement the timer value
    const tick = () => {
        setSeconds(prevSeconds => (prevSeconds > 0 ? prevSeconds - 1 : handleExamSubmit()));
    };

    // Effect hook to run the tick function every second
    useEffect(() => {
        const timer = setInterval(() => tick(), 1000);
        return () => clearInterval(timer); // Cleanup function to clear interval on unmount
    }, []);

    // Format seconds into hh:mm:ss format
    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    async function handleSaveNext() {
        if (i+1 < sectionQuestion.length) {
            i++;
            setQnNum(i+1);
            setCurrentQn(sectionQuestion[i]);
            sectionQuestion[i].visited = true;
        }
        else {
            i=0;
            setQnNum(i+1)
            setCurrentQn(sectionQuestion[i]);
        }
    }


    const saveAnswer = async (index) => {
        sectionQuestion[i].answer = index;
        sectionQuestion[i].answered = true;
        if(! await saveAnswertoDB(i, sectionIndicator, index)){
            alert("CONNECTION TO SERVER LOST. CONTACT INVIGILATOR IMMEDIATELY");
        }
        // setCurrentQn(sectionQuestion[i]);
    }

    function handleTileClick(index) {
        i = index;
        setCurrentQn(sectionQuestion[i])
        setQnNum(i+1);
        sectionQuestion[i].visited = true;
    }

    function classListMaker(question) {
        if(question.review && question.answered){
            return("ansrev")
        }
        else if(question.review) {
            return("rev")
        }
        else if(question.answered){
            return("ans")
        }
        else if(question.visited){
            return("notans")
        }
        else {
            return("notvis")
        }
    }

    async function handleReviewNext() {
        sectionQuestion[i].review = true;
        await 
        handleSaveNext();
    }

    function handleClearResponce() {
        saveAnswer(null);
        delete sectionQuestion[i].answer;
        sectionQuestion[i].answered = false;
        sectionQuestion[i].review = false;
    }




    return (
        <div className='exampage'>
            <div className="examheader">
                <label>{examdetails.longname}</label>
            </div>
            <div className="examdiv">
                <div className="questionpane">
                    <div className="subjectbar">
                        <div className="subject">
                            {examdetails.name}
                        </div>
                    </div>
                    <div className="sectionandtime bordersimple">
                        <label className='titlesection'>Section</label>
                        <label className='timeleft'>Time Left : {formatTime(seconds)}</label>
                    </div>
                    <div className="sections bordersimple">
                        {/* <div className={"section"}>Data Structures  </div> */}
                        {
                            qnSections.map((section, index)=> (
                                <div className={sectionIndicator==index ? "section" : "section " + "sectionoff" } key={index} onClick={()=>updateSection(index)}>{section}  </div>
                            ))
                        }
                        {/* <div className={"section" + " " + "sectionoff"}>Operating Systems  </div> */}
                    </div>
                    <div className="questionnumbar bordersimple">
                        <label >Question Number : {qnNum} / {sectionQuestion.length}</label>
                    </div>
                    <QuestionView question={currentQn} saveAnswer = {saveAnswer} />
                    <div className="controlbuttons">
                        <div>
                            <button className="normbtn" onClick={handleReviewNext}>Mark for Review and Next</button>
                            <button className="normbtn" onClick={handleClearResponce}>Clear Responce</button>
                        </div>
                        <button className='savenextbtn' onClick={handleSaveNext}>Save and Next</button>
                    </div>
                </div>

                <div className="palattepane">
                    <div className='usercontainer'>
                        <img className='userimage' src="https://media.istockphoto.com/id/1177794485/vector/person-gray-photo-placeholder-woman.jpg?s=612x612&w=0&k=20&c=B41l9xgyu4bR63vPqt49mKZIRGh8ewpewN7zXnYPOsI=" alt="User Image" height={100} width={100} />
                        <label className='username'>{sessionStorage.getItem('username')}</label>
                    </div>
                    <div className="status bordersimple">
                        <div>
                            <div className='ans'></div>
                            <label>Answered</label>
                        </div>
                        <div>
                            <div className="notans"></div>
                            <label>Not Answered</label>
                        </div>
                        <div>
                            <div className="notvis"></div>
                            <label>Not Visited</label>
                        </div>
                        <div>
                            <div className="rev"></div>
                            <label>Marked for<br />Review</label>
                        </div>
                        <div>
                            <div className="ansrev"></div>
                            <label>Answered and Marked for Review</label>
                        </div>
                    </div>
                    <div className='navigator bordersimple'>
                        <div className="navtitle">{qnSections[sectionIndicator]}</div>

                        <div className='navtilediv'>
                            {
                                sectionQuestion.map((question, index) => (
                                    <div className='navtile'>
                                        <div className={classListMaker(question)} onClick={()=>handleTileClick(index)}>{index+1}</div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                    <div className="submitdiv">
                        <button className="examsubmitbtn" onClick={handleExamSubmit}>Submit</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ExamPage