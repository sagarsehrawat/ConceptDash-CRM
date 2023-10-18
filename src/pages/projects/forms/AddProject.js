import React, { useEffect, useState } from 'react'
import { Modal, ModalBody } from 'react-bootstrap'
import './AddProject.css'
import headerIcon from '../../../Images/Projects.svg';
import tick from '../../../assets/icons/Primary_Color_Tick.svg'
import IndependentProject from './types/IndependentProject';
import RosterProject from './types/RosterProject';
import ChildProject from './types/ChildProject';
import FormUtils from '../../../utils/FormUtils';
import Tasklist from '../tasklist/Tasklist';
import TaskListUtils from '../utils/TaskListUtils';

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
        departmentId: '',
        projectCategory: '',
        projectCategoryId: '',
        city: '',
        cityId: '',
        projectName: '',
        status: 'In Progress',
        priority: 'Medium',
        designChecklist: [],
        designInfo: []
    })
    const formUtils = FormUtils(setForm)

    const [taskList, setTaskList] = useState([])
    const [openTasks, setOpenTasks] = useState([])

    const resetForm = (val) => {
        setForm({
            projectType: val,
            department: "",
            departmentId: '',
            projectCategory: '',
            projectCategoryId: '',
            city: '',
            cityId: '',
            projectName: '',
            status: 'In Progress',
            priority: 'Medium',
            designChecklist: [],
            designInfo: []
        });
    }

    const handleForm = (key, value) => {
        console.log(key, value);

        switch (key) {
            case 'projectType':
                formUtils.radioButtonForm(key, value);
                resetForm(value)
                break;
            case 'designChecklist':
                formUtils.checkboxForm(key, value)
                break;
            case 'designInfo':
                formUtils.checkboxForm(key, value)
                break;
            case 'department':
                formUtils.typeaheadForm(key, value);
                const tasks = TaskListUtils().taskListFormatter(form.department)
                setTaskList(tasks);
                setOpenTasks(tasks.map(task => task.taskId ));
                break;
            case 'projectCategory':
                formUtils.typeaheadForm(key, value);
                break;
            case 'projectManager':
                formUtils.typeaheadForm(key, value);
                break;
            case 'city':
                formUtils.typeaheadForm(key, value);
                break;
            default:
                formUtils.typeInputForm(key, value);
                break;
        }
    }

    const handleProjectType = (projectType) => {
        switch (projectType) {
            case 'Independent Project':
                return <IndependentProject form={form} handleForm={handleForm} />
            case 'Roster Project':
                return <RosterProject form={form} handleForm={handleForm} />
            case 'Child Project':
                return <ChildProject form={form} handleForm={handleForm} />
            default:
                return <></>
        }
    }

    console.log(form)

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onHide}
                style={styles.addModal}
                dialogClassName=""
                animation={false}
            >
                <ModalBody style={{ "height": "100vh" }}>
                    <div className='project-modal-container'>
                        <div className='project-modal-header'>
                            <div className='icon-container'>
                                <img src={headerIcon} />
                            </div>
                            <p className='heading-2'>Create New Project</p>
                        </div>

                        <div className='d-flex justify-contents-center align-items-center w-100'>
                            <div className={`project-type type-left ${form.projectType === 'Independent Project' ? 'project-type-active' : ''}`} onClick={(e) => { handleForm('projectType', 'Independent Project') }}>
                                {form.projectType === "Independent Project" ? <img src={tick} alt="" /> : <></>}
                                Independent Project
                            </div>
                            <div className={`project-type ${form.projectType === 'Roster Project' ? 'project-type-active' : ''}`} onClick={(e) => { handleForm('projectType', 'Roster Project') }}>
                                {form.projectType === "Roster Project" ? <img src={tick} alt="" /> : <></>}
                                Roster Project
                            </div>
                            <div className={`project-type type-right ${form.projectType === 'Child Project' ? 'project-type-active' : ''}`} onClick={(e) => { handleForm('projectType', 'Child Project') }}>
                                {form.projectType === "Child Project" ? <img src={tick} alt="" /> : <></>}
                                Child Project
                            </div>
                        </div>

                        <form style={{ width: '100%' }}>
                            {handleProjectType(form.projectType)}
                        </form>

                        <div className='w-100'>
                            <p className="heading-2">Project Milestone and Tasks</p>
                            <Tasklist taskList={taskList} setTaskList={setTaskList} openTasks={openTasks} setOpenTasks={setOpenTasks}/>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default AddProject