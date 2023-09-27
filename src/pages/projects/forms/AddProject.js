import React, { useState } from 'react'
import { Modal, ModalBody } from 'react-bootstrap'
import './AddProject.css'
import headerIcon from '../../../Images/Projects.svg';

const AddProject = (props) => {
    const styles = {
        addModal: {
            position: "absolute",
            width: "50vw",
            background: "#FFFFFF",
            top: 0,
            right: 0,
            bottom: 0,
            left: '50vw',
          },
    }

    const [form, setForm] = useState({
        projectType: "Independent Project"
    })
  return (
    <>
        {/* <div className={`modal project-modal ${true ? 'visible' : 'hidden'}`}>
        <div className='project-modal-container'>
                <div className='d-flex align-items-center'>
                    <img src={headerIcon} />
                    <p className='heading-2'>Create New Project</p>
                </div>
            </div>
        </div> */}
        <Modal
            show={props.show}
            onHide={props.onHide}
            style={styles.addModal}
            dialogClassName=""
            animation={false}
        >
            <ModalBody style={{"height" : "100vh"}}>
                <div className='project-modal-container'>
                    <div className='project-modal-header'>
                        <div className='icon-container'>
                            <img src={headerIcon} />
                        </div>
                        <p className='heading-2'>Create New Project</p>
                    </div>

                    <div className='d-flex flex-row justify-contents-center align-items-center'>
                        <div className={`project-type ${form.projectType==='Independent Project' ? 'project-type-active' : 'project-type-inactive'}`} onClick={(e) => {}}>
                            Independent Project
                        </div>
                        <div className={`project-type ${form.projectType==='Roster Project' ? 'project-type-active' : 'project-type-inactive'}`} onClick={(e) => {}}>
                            Roster Project
                        </div>
                        <div className={`project-type ${form.projectType==='Child Project' ? 'project-type-active' : 'project-type-inactive'}`} onClick={(e) => {}}>
                            Child Project
                        </div>
                    </div>
                </div>
            </ModalBody>

        </Modal>
    </>
  )
}

export default AddProject