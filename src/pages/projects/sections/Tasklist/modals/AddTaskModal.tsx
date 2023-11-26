import React, { useState } from 'react'
import './AddTaskModal.css'
import TFIcon from '../../../../../components/ui/TFIcon/TFIcon';
import ICONS from '../../../../../constants/Icons';
import TFButton from '../../../../../components/ui/TFButton/TFButton';
import headerIcon from '../../../../../Images/Projects.svg';
import FormUtils from '../../../../../utils/FormUtils';
import TFTypeahead from '../../../../../components/form/TFTypeahead/TFTypeahead';
import Utils from '../../../../../utils/Utils';
import TFInput from '../../../../../components/form/TFInput/TFInput';

type Props = {
    tasks: string[];
    onHide: () => null;
    selectedMilestone: string;
}

const AddTaskModal = ({ tasks, onHide, selectedMilestone }: Props) => {
    const [form, setForm] = useState<{ type: string, milestone: string, task: string }>({
        type: 'Add Task',
        milestone: selectedMilestone ?? '',
        task: ''
    });
    const formUtils = FormUtils(setForm);

    const handleForm = (name: string, value: string) => {
        if (name === 'type') {
            formUtils.radioButtonForm(name, value);
        }
        if(name === 'milestone'){
            formUtils.typeaheadForm(name, value);
        }
    }
    return (
        <div className="tf-modal-backdrop d-flex justify-content-center align-items-center">
            <div className='add-task-modal'>
                <div className='d-flex flex-row justify-content-end align-items-center'>
                    <TFIcon icon={ICONS.CROSS_PRIMARY} onClick={onHide} />
                </div>
                <div className='d-flex flex-column align-items-start' style={{ gap: "24px" }}>
                    <div className='d-flex flex-column align-items-start' style={{ gap: "20px" }}>
                        <div className='d-flex flex-row justify-content-start align-items-center gap-8 w-100'>
                            <div className='icon-container'>
                                <img src={headerIcon} />
                            </div>
                            <p className='heading-2'>Add New Task / Milestone</p>
                        </div>

                        <div className='d-flex justify-contents-center align-items-center w-100'>
                            <div className={`project-type type-left ${form.type === 'Add Task' ? 'project-type-active' : ''}`} onClick={() => { handleForm('type', 'Add Task') }}>
                                {form.type === "Add Task" ? <TFIcon icon={ICONS.TICK_PRIMARY} /> : <></>}
                                Add Task
                            </div>
                            <div className={`project-type type-right ${form.type === 'Add Milestone' ? 'project-type-active' : ''}`} onClick={() => { handleForm('type', 'Add Milestone') }}>
                                {form.type === "Add Milestone" ? <TFIcon icon={ICONS.TICK_PRIMARY} /> : <></>}
                                Add Milestone
                            </div>
                        </div>

                        <div className='d-flex flex-column justify-content-start align-items-start'>
                            <p className='project-label'>Choose Milestone <sup style={{ color: "#E13D19" }}>*</sup></p>
                            <TFTypeahead
                                name={'milestone'}
                                placeholder='Choose Milestone'
                                defaultValue={selectedMilestone}
                                onChange={handleForm}
                                options={Utils.convertToTypeaheadOptions(tasks.map((task) => {return {task_id: task, task: task}}), 'task', 'task_id')}
                                width='100%'
                            />
                        </div>

                        <div>
                        <p className='project-label'>Add Task <sup style={{ color: "#E13D19" }}>*</sup></p>
                            <TFInput
                                name={'task'}
                                placeholder='Enter Task Name'
                                value={form.task}
                                onChange={handleForm}
                                width='100%'
                            />
                        </div>
                    </div>
                    <div className='d-flex flex-row justify-content-around'>
                        <TFButton
                            label='Cancel'
                            handleClick={onHide}
                        />
                        <TFButton
                            label={'Add Task'}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTaskModal