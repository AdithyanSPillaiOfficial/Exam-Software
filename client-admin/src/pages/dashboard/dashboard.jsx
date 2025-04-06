import React from 'react'
import './dashboard.css'

function dashboard() {
  return (
    <div className='dashboard'>
        <div className='heading'>Dashboard</div>
        <div className='tablediv'>
          <table>
            <tr>
              <th>Sl.No</th>
              <th>Exam Name</th>
              <th>Status</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
            <tr>
              <td>1</td>
              <td>JavaScript</td>
              <td>Completed</td>
              <td>2 hours</td>
              <td><button >View</button></td>
            </tr>
          </table>
        </div>
    </div>
  )
}

export default dashboard