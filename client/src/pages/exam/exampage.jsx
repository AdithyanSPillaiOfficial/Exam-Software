import React, { useEffect, useState } from 'react'
import './exampage.css'
import QuestionView from './questionview/questionview'
import { useNavigate } from 'react-router-dom';
import { socket, connectSocket, disconnectSocket, connectionStatus } from "../../socket";


function ExamPage() {
    const navigate = useNavigate();

    const samplearray = [1,2,3,4,5,6,7,9,10];

    function handleExamSubmit() {
        navigate('/login');
    }

    const initialTime = 180 * 60;
    const [seconds, setSeconds] = useState(20);

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
                    <div className='usercontainer'>
                        <img className='userimage' src="https://media.istockphoto.com/id/1177794485/vector/person-gray-photo-placeholder-woman.jpg?s=612x612&w=0&k=20&c=B41l9xgyu4bR63vPqt49mKZIRGh8ewpewN7zXnYPOsI=" alt="User Image" height={100} width={100} />
                        <label className='username'>Name</label>
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
                                samplearray.map(num => (
                                    <div className='navtile'>
                                        <div className="notvis">{num}</div>
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