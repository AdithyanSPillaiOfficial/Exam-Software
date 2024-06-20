import React, { useEffect, useState } from 'react'
import './exampage.css'
import QuestionView from './questionview/questionview'
import { useNavigate } from 'react-router-dom';
import { socket, connectSocket, disconnectSocket, connectionStatus } from "../../socket";
import { sampleqn } from './sampleqn';
var i = 0;

function ExamPage() {
    const navigate = useNavigate();


    const questions = sampleqn;
    const [qnNum, setQnNum] = useState(1);
    const [currentQn, setCurrentQn] = useState(sampleqn[0])
    questions[0].visited = true;

    function handleExamSubmit() {
        navigate('/login');
    }

    const initialTime = 10 * 60;
    const [seconds, setSeconds] = useState(initialTime);

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
        if (i+1 < questions.length) {
            i++;
            setQnNum(i+1);
            setCurrentQn(questions[i]);
            questions[i].visited = true;
        }
        else {
            i=0;
            setQnNum(i+1)
            setCurrentQn(questions[i]);
        }
    }


    const saveAnswer = (index) => {
        questions[i].answer = index;
        questions[i].answered = true;
        // setCurrentQn(questions[i]);
    }

    function handleTileClick(index) {
        i = index;
        setCurrentQn(questions[i])
        setQnNum(i+1);
        questions[i].visited = true;
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
        questions[i].review = true;
        await 
        handleSaveNext();
    }

    function handleClearResponce() {
        delete questions[i].answer;
        questions[i].answered = false;
        questions[i].review = false;
    }




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
                        <label className='timeleft'>Time Left : {formatTime(seconds)}</label>
                    </div>
                    <div className="sections bordersimple">
                        <div className={"section"}>Data Structures  </div>
                        <div className={"section" + " " + "sectionoff"}>Operating Systems  </div>
                    </div>
                    <div className="questionnumbar bordersimple">
                        <label >Question Number : {qnNum} / {questions.length}</label>
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
                        <div className="navtitle">Computer Science</div>

                        <div className='navtilediv'>
                            {
                                questions.map((question, index) => (
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