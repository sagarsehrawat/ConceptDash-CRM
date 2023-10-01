import React, { useEffect, useState } from 'react'
import { Modal, ModalBody } from 'react-bootstrap'
import './AddProject.css'
import headerIcon from '../../../Images/Projects.svg';
import tick from '../../../assets/icons/tick.svg'
import IndependentProject from './types/IndependentProject';
import RosterProject from './types/RosterProject';
import ChildProject from './types/ChildProject';

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
        projectType: "Independent Project",
        department: "",
        projectCategory: '',
        city: '',
        status: 'In Progress',
        priority: 'Medium',
        designChecklist: [],
        designInfo: []
    })

    const resetForm = (val) => {
        setForm({
            projectType: val,
            department: "",
            status: 'In Progress',
            priority: 'Medium',
            designChecklist: [],
            designInfo: []
        });
    }

    const handleForm = (e, key, value) => {
        if(e) e.preventDefault();
        console.log(e, key, value);
 
        if(key==='projectType'){
            resetForm(value)
        }else if(key==='designChecklist' || key==='designInfo'){
            setForm((prev) => {
                const newForm = {...prev};

                const valueIndex = newForm[key].indexOf(value);

                if (valueIndex === -1) {
                    newForm[key].push(value);
                } else {
                    newForm[key].splice(valueIndex, 1);
                }

                return newForm;
            })
        }else{
            setForm((prev) => {
                return {
                    ...prev,
                    [key]: value
                }
            })
        }
    }

    const handleProjectType = (projectType) => {
        switch (projectType) {
            case 'Independent Project':
                return <IndependentProject form={form} handleForm={handleForm}/>
            case 'Roster Project':
                return <RosterProject form={form} handleForm={handleForm}/>
            case 'Child Project':
                return <ChildProject form={form} handleForm={handleForm}/>
            default:
                return <></>
        }
    }

  return (
    <>
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

                    <div className='d-flex justify-contents-center align-items-center w-100'>
                        <div className={`project-type type-left ${form.projectType==='Independent Project' ? 'project-type-active' : ''}`} onClick={(e) => {handleForm(null, 'projectType', 'Independent Project')}}>
                            {form.projectType==="Independent Project" ? <img src={tick} alt=""/> : <></>}
                            Independent Project
                        </div>
                        <div className={`project-type ${form.projectType==='Roster Project' ? 'project-type-active' : ''}`} onClick={(e) => {handleForm(null, 'projectType', 'Roster Project')}}>
                        {form.projectType==="Roster Project" ? <img src={tick} alt=""/> : <></>}
                            Roster Project
                        </div>
                        <div className={`project-type type-right ${form.projectType==='Child Project' ? 'project-type-active' : ''}`} onClick={(e) => {handleForm(null, 'projectType', 'Child Project')}}>
                        {form.projectType==="Child Project" ? <img src={tick} alt=""/> : <></>}
                            Child Project
                        </div>
                    </div>

                    {handleProjectType(form.projectType)}
                </div>
            </ModalBody>
        </Modal>
    </>
  )
}

export default AddProject