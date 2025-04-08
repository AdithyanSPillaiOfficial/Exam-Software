import React, { useState } from 'react'
import './dashboard.css'

function Dashboard() {
  const [exams, setExams] = useState([
    {
      id: 'boewwelfnlwn',
      name: 'JavaScript',
      status: 'Completed',
      duration: '120'
    },
    {
      id: 'cwewfwfwfwdv',
      name: 'C Programmming',
      status: 'Completed',
      duration: '60'
    }
  ]);

  const [popupOpen, setPopupOpen] = useState(false);
  const [examForm, setExamForm] = useState({
    name: '',
    shortname: '',
    status: '',
    duration: '',
    sections : 0,
    sectionlist : []
  });
  const [editIndex, setEditIndex] = useState(null);



  function handleAddExam() {
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
            <th>Duration</th>
            <th>Actions</th>
          </tr>
          {
            exams.map((exam, index) =>
            (
              <tr key={exam.id}>
                <td>{index + 1}</td>
                <td>{exam.name}</td>
                <td>{exam.shortname}</td>
                <td>{exam.status}</td>
                <td>{exam.duration} mins</td>
                <td>
                  <button className='editbtn' onClick={() => {setExamForm(exams[index]); setEditIndex(index); setPopupOpen(true)}}>Edit</button>
                  <button className='editbtn'>Manage</button>
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
                <input type="text" placeholder='Exam Name' value={examForm.name} onChange={(e) => setExamForm(prev => ({...prev,name: e.target.value}))} className='forminput bordersimple' />
              </div>
              <div className='inputdiv'>
                <div className='personicondiv bordersimple'><img src="https://drubinbarneslab.berkeley.edu/wp-content/uploads/2012/01/icon-profile.png" className='personicon' alt="" /></div>
                <input type="text" placeholder='Exam Short Name' value={examForm.shortname} onChange={(e) => setExamForm(prev => ({...prev,shortname: e.target.value}))} className='forminput bordersimple' />
              </div>
              <div className='inputdiv'>
                <div className='personicondiv bordersimple'><img src="https://cdn-icons-png.freepik.com/512/2893/2893425.png" className='personicon' alt="" /></div>
                <input type="number" placeholder='No. of Sections' value={examForm.sections} onChange={(e) => setExamForm(prev => ({...prev, sections : e.target.value}))} className='forminput bordersimple' />
              </div>
              <div className='inputdiv'>
                <div className='personicondiv bordersimple'><img src="https://cdn-icons-png.freepik.com/512/2893/2893425.png" className='personicon' alt="" /></div>
                <input type="number" placeholder='Duration' value={examForm.duration} onChange={(e) => setExamForm(prev => ({...prev, duration : e.target.value}))} className='forminput bordersimple' />
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