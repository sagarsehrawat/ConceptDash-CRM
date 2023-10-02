import React from 'react'
// import './TTMTable.css'

function TTMTable() {
  const style = {
    input: {
      border: "none",
      boxShadow: "none",
      outline: "none",
      width: "100%",
      display: "inline",
      background: "rgb(0 0 0 / 0%)",
      // padding: "12px 0px",
      textAlign:'center',
      ':focus' : {
        border: "5px solid black",
        // boxShadow: "none",
        outline: "none",
      }
    }
  }
  let tasks = ['Task1', 'Task2', 'task3', 'Task4', 'Task5']
  let tasksData = [
    [1, 2, 3, 4, 5, 6, 7, 2, 3, 5, 3, 6, 9],
    [1, 2, 3, 4, 5, 6, 7, 2, 3, 5, 3, 6, 9],
    [1, 2, 3, 4, 5, 6, 7, 2, 3, 5, 3, 6, 9],
    [1, 2, 3, 4, 5, 6, 7, 2, 3, 5, 3, 6, 9],
    [1, 2, 3, 4, 5, 6, 7, 2, 3, 5, 3, 6, 9]
  ];
  return (
    <div>
     <div className='pageHeader'>
      TTM : Name of the Proposal/Project
     </div>

      {/* Table Header */}

      <div className='tableHeader'>
        <div className='tableHeaderText'>Name of the Proposal/Project</div>
      </div>

      {/* First four rows table */}
    <div className='tableFixHead'>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th style={{paddingLeft:'32px'}} className='normals'>Project Department</th>
            <th className='normals' colSpan={3}>Project Management</th>
            <th className='normals' colSpan={2}>Design</th>
            <th className='normals' colSpan={3}>Design Team</th>
            <th className='normals'>Transportation, Traffic Engineering, Traffic control plans and Utility Coordination</th>
            <th className='normals' colSpan={2}>Bids and Tender Preparation Team</th>
            <th className='normals' colSpan={2}>Contract administration and Construction Inspection</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{paddingLeft:'32px'}} className='normals'>Designation</td>
            <td className='normals'>Project Manager</td>
            <td className='normals'>Project Director</td>
            <td className='normals'>Qa/QC lead and Risk Manager</td>
            <td className='normals'>Technical Design Lead</td>
            <td className='normals'>Transportation Planning and Engineering Lead</td>
            <td className='normals'>Roadway Designers</td>
            <td className='normals'>Watermain, Sanitary and Storm Sewer Designers</td>
            <td className='normals'>Cad Technician</td>
            <td className='normals'>Transportation, Traffic Engineering, Traffic control plans and Utility Coordination</td>
            <td className='normals'>TakeOff Engineer</td>
            <td className='normals'>Junior Engineer</td>
            <td className='normals'>Contract Administrator</td>
            <td className='normals'>Site Inspector</td>
          </tr>
          <tr>
            <td style={{paddingLeft:'32px'}} className='normals'>People</td>
            <td className='specials'>Vivek Sharma</td>
            <td className='specials'>Chandi Gaunguly</td>
            <td className='specials'>Garima Malav</td>
            <td className='specials'>Amala Seb</td>
            <td className='specials'>Sagar KP</td>
            <td className='specials'>Nikitha Anand</td>
            <td className='specials'>Nikitha Anand</td>
            <td className='specials'>Nikitha Anand</td>
            <td className='specials'>Nikitha Anand</td>
            <td className='specials'>Nikitha Anand</td>
            <td className='specials'>Nikitha Anand</td>
            <td className='specials'>Nikitha Anand</td>
            <td className='specials'>Nikitha Anand</td>
          </tr>
          <tr>
            <td style={{paddingLeft:'32px'}} className='normals'>Rate Per Hour</td>
            <td className='specials'>$ 0.00</td>
            <td className='specials'>$ 0.00</td>
            <td className='specials'>$ 0.00</td>
            <td className='specials'>$ 0.00</td>
            <td className='specials'>$ 0.00</td>
            <td className='specials'>$ 0.00</td>
            <td className='specials'>$ 0.00</td>
            <td className='specials'>$ 0.00</td>
            <td className='specials'>$ 0.00</td>
            <td className='specials'>$ 0.00</td>
            <td className='specials'>$ 0.00</td>
            <td className='specials'>$ 0.00</td>
            <td className='specials'>$ 0.00</td>
          </tr>
          <tr><td colSpan={6} bgcolor='#E4FEF1'
           style={{
            height: '38px',
            textAlign:'left',
            color:' var(--black-text, #0A0A0A)',
            fontSize: '13px',
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '500',
            lineHeight: '20px',
            backgroundColor: '#E4FEF1',
          }}>
            <p style={{
              paddingLeft:'24px'
            }}>Phase Name - I</p></td>
          </tr>
          <tr>
            <td style={{paddingLeft:'32px'}} /* className='normals' */>{tasks[0]}</td>
            {tasksData[0].map((e)=>{
              return (
                <td /* className='specials' */>
                  <input
                    className='no-focus'
                    style={style.input}
                    value={e}
                  />
                </td>
              )
            })}
          </tr>
          <tr>
            <td style={{paddingLeft:'32px'}} /* className='normals' */>{tasks[1]}</td>
            {tasksData[1].map((e)=>{
              return (
                <td /* className='specials' */>
                  <input
                    className='no-focus'
                    style={style.input}
                    value={e}
                  />
                </td>
              )
            })}
          </tr>
          <tr>
            <td style={{paddingLeft:'32px'}} /* className='normals' */>{tasks[2]}</td>
            {tasksData[2].map((e)=>{
              return (
                <td /* className='specials' */>
                  <input
                    className='no-focus'
                    style={style.input}
                    value={e}
                  />
                </td>
              )
            })}
          </tr>
          <tr>
            <td style={{paddingLeft:'32px'}} /* className='normals' */>{tasks[3]}</td>
            {tasksData[3].map((e)=>{
              return (
                <td /* className='specials' */>
                  <input
                    className='no-focus'
                    style={style.input}
                    value={e}
                  />
                </td>
              )
            })}
          </tr>
          <tr>
            <td style={{paddingLeft:'32px'}} /* className='normals' */>{tasks[4]}</td>
            {tasksData[4].map((e)=>{
              return (
                <td /* className='specials' */>
                  <input
                    className='no-focus'
                    style={style.input}
                    value={e}
                  />
                </td>
              )
            })}
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default TTMTable
