import React, { useEffect, useState } from 'react'
import './dashboard.css'
import { serverAddress } from '../../api';
import { fetchExamDetails, fetchQuestions } from '../exam/mediator';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [exams, setExams] = useState([]);

  const [popupOpen, setPopupOpen] = useState(false);
  const [examForm, setExamForm] = useState({
    name: '',
    shortname: '',
    status: '',
    duration: '',
    sections: 0,
    sectionlist: []
  });
  const [editIndex, setEditIndex] = useState(null);

  const navigate = useNavigate();

  async function getExams() {
    const responce = await fetch(serverAddress + '/admin/getexams', {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sessionid: sessionStorage.getItem('sessionId')
      }),
    })

    if (responce.ok) {
      const data = await responce.json();
      if (data.status === 'OK') {
        setExams(data.exams);
      }
    }
  }

  useEffect(() => {
    getExams();
  }, [])




  function handleAddExam() {
    setEditIndex(null)
    setExamForm({})
    setPopupOpen(!popupOpen);
  }
  function addExam() {
    setExams(prev => ([...prev, examForm]));
    setPopupOpen(false)
    setExamForm({});
  }
  function editExam() {
    var tempExams = [...exams];
    tempExams[editIndex] = examForm;
    setExams(tempExams);
    setPopupOpen(false);
    setEditIndex(null);
    setExamForm({});
  }

  function deleteExam(index) {
    var tempExams = [...exams];
    tempExams.splice(index, 1);
    setExams(tempExams);
  }

  async function launchQuestionPallette(index) {
    sessionStorage.setItem('examid', exams[index]._id.toString());
    sessionStorage.setItem('examname', exams[index].name);
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
    <div className='dashboard'>
      <div className='heading'>Dashboard</div>
      <div className='tablediv'>
        <table>
          <tr className='tableheading'>
            <th>Sl.No</th>
            <th>Exam Name</th>
            <th>Short Code</th>
            <th>Status</th>
            <th>Total Sections</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
          {
            exams.map((exam, index) =>
            (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{exam.longname}</td>
                <td>{exam.name}</td>
                <td>{exam.status}</td>
                <td>{exam.totalsections}</td>
                <td>{exam.time} mins</td>
                <td>
                  <button className='editbtn' onClick={() => { setExamForm(exams[index]); setEditIndex(index); setPopupOpen(true) }}>Edit</button>
                  <button className='editbtn' onClick={() => launchQuestionPallette(index)} >Question Palette</button>
                  <button className="editbtn" onClick={() => deleteExam(index)}>Delete</button>
                </td>
              </tr>
            )
            )
          }

        </table>
      </div>
      <div className="addexamdiv">
        <div className='addexaminnerdiv' onClick={handleAddExam}>+ Add Exam</div>
      </div>

      {/* Pop Up Element */}
      {popupOpen && (
        <div className='popup-overlay'>
          <div className='popup-content'>
            <div className="loginformtitlebar bordersimple titleflexdiv">
              <label >{editIndex !== null ? "Edit Exam" : "Add Exam"}</label>
              <button className='close-btn' onClick={() => handleAddExam(false)}>X</button>
            </div>
            <div className="formdiv bordersimple formdivheight">
              <div className='inputdiv'>
                <div className='personicondiv bordersimple'><img src="https://drubinbarneslab.berkeley.edu/wp-content/uploads/2012/01/icon-profile.png" className='personicon' alt="" /></div>
                <input type="text" placeholder='Exam Name' value={examForm.longname} onChange={(e) => setExamForm(prev => ({ ...prev, longname: e.target.value }))} className='forminput bordersimple' />
              </div>
              <div className='inputdiv'>
                <div className='personicondiv bordersimple'><img src="https://drubinbarneslab.berkeley.edu/wp-content/uploads/2012/01/icon-profile.png" className='personicon' alt="" /></div>
                <input type="text" placeholder='Exam Short Name' value={examForm.name} onChange={(e) => setExamForm(prev => ({ ...prev, name: e.target.value }))} className='forminput bordersimple' />
              </div>
              <div className='inputdiv'>
                <div className='personicondiv bordersimple'><img src="https://cdn-icons-png.freepik.com/512/2893/2893425.png" className='personicon' alt="" /></div>
                <input type="number" placeholder='No. of Sections' value={examForm.totalsections} onChange={(e) => setExamForm(prev => ({ ...prev, totalsections: e.target.value }))} className='forminput bordersimple' />
              </div>
              <div className='inputdiv'>
                <div className='personicondiv bordersimple'><img src="https://cdn-icons-png.freepik.com/512/2893/2893425.png" className='personicon' alt="" /></div>
                <input type="number" placeholder='Duration' value={examForm.time} onChange={(e) => setExamForm(prev => ({ ...prev, time: e.target.value }))} className='forminput bordersimple' />
              </div>
              <div className="buttondiv">
                <button className='submitbtn' onClick={editIndex !== null ? editExam : addExam} >{editIndex !== null ? "Edit Exam" : "Add Exam"}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard