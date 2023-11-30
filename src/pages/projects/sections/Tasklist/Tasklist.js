import React, { useEffect, useState } from 'react'
import './Tasklist.css'
import moment from 'moment'
import TFIcon from '../../../../components/ui/TFIcon/TFIcon'
import ICONS from '../../../../constants/Icons'
import TFChip from '../../../../components/form/TFChip/TFChip'
import TaskListUtils from '../../utils/TaskListUtils'
import TFDateChip from '../../../../components/form/TFDateChip/TFDateChip'
import TFTypeahead from '../../../../components/form/TFTypeahead/TFTypeahead'
import AddTaskModal from './modals/AddTaskModal'

const Tasklist = ({ taskList, setTaskList, openTasks, setOpenTasks, employees }) => {
    const taskListUtils = new TaskListUtils(setTaskList);
    const [showAddModal, setShowAddModal] = useState(false);
    console.log(showAddModal)

    const handleClickMilestone = (taskId) => {
        setOpenTasks(prev => {
            if (prev.includes(taskId)) {
                return prev.filter(id => id !== taskId);
            } else {
                return [...prev, taskId];
            }
        });
    }

    return (
        <>
            <div className='tasklist-wrapper'>
                <table className='tasklist-table w-100'>
                    <thead className='fixed-table-header'>
                        <tr>
                            <th className='tasklist-table-header fixed-column' style={{ width: '256px' }}>Milestone/ Task</th>
                            <th className='tasklist-table-header' style={{ width: '160px' }}>Due Date</th>
                            <th className='tasklist-table-header' style={{ width: '110px' }}>Status</th>
                            <th className='tasklist-table-header' style={{ width: '140px' }}>Assigned To</th>
                            <th className='tasklist-table-header' style={{ width: '88px' }}>Priority</th>
                            <th className='tasklist-table-header' style={{ width: '174px' }}>Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            taskList.map(task => (
                                <>
                                    <tr>
                                        <td className='tasklist-cell fixed-column' style={{ borderLeft: '1px solid #EBEDF8', borderRight: '1px solid #EBEDF8' }}>
                                            <div className='d-flex flex-row justify-content-start'>
                                                {
                                                    openTasks.includes(task.taskId)
                                                        ? <TFIcon icon={ICONS.ARROW_DROPDOWN_OPEN_BLACK} alt={'Chevron Right Icon'} onClick={(e) => handleClickMilestone(task.taskId)} />
                                                        : <TFIcon icon={ICONS.ARROW_DROPDOWN_CLOSE_BLACK} alt={'Chevron Right Icon'} onClick={(e) => handleClickMilestone(task.taskId)} />
                                                }
                                                {task.task}
                                            </div>
                                        </td>
                                        <td className='tasklist-cell'>
                                            <TFDateChip
                                                value={moment(task.endDate)}
                                            />
                                        </td>
                                        <td className='tasklist-cell'><TFChip value={task.status} /></td>
                                        <td className='tasklist-cell'></td>
                                        <td className='tasklist-cell'><TFChip name='priority' value={task.priority} options={['Low', 'Medium', 'High', 'Critical']} onChange={(name, value) => taskListUtils.handleTaskListChange(task.taskId, null, name, value)} /></td>
                                        <td className='tasklist-cell'>{task.progress}</td>
                                    </tr>
                                    {
                                        openTasks.includes(task.taskId) &&
                                        task.subtasks.map(subtask => (
                                            <tr>
                                                <td className='tasklist-cell fixed-column' style={{ borderLeft: '1px solid #EBEDF8', borderRight: '1px solid #EBEDF8', paddingLeft: '36px' }}>{subtask.task}</td>
                                                <td className='tasklist-cell'>
                                                    <TFDateChip
                                                        value={moment(subtask.endDate)}
                                                        name='endDate'
                                                        onChange={(name, value) => taskListUtils.handleTaskListChange(subtask.parentId, subtask.taskId, name, value)}
                                                    />
                                                </td>
                                                <td className='tasklist-cell'>
                                                    <TFChip
                                                        name='status'
                                                        value={subtask.status}
                                                        options={['Not Started', 'In Progress', 'Completed']}
                                                        onChange={(name, value) => taskListUtils.handleTaskListChange(subtask.parentId, subtask.taskId, name, value)}
                                                    />
                                                </td>
                                                <td className='tasklist-cell'>
                                                    <TFTypeahead
                                                        value
                                                        name='assignedTo'
                                                        placeholder='Assigned To'
                                                        width='100%'
                                                        defaultValue={subtask.assignedTo}
                                                        onChange={(name, value) => taskListUtils.handleTaskListChange(subtask.parentId, subtask.taskId, name, value)}
                                                        options={employees}
                                                    />
                                                </td>
                                                <td className='tasklist-cell'>
                                                    <TFChip
                                                        name='priority'
                                                        value={subtask.priority}
                                                        options={['Low', 'Medium', 'High', 'Critical']}
                                                        onChange={(name, value) => taskListUtils.handleTaskListChange(subtask.parentId, subtask.taskId, name, value)}
                                                    />
                                                </td>
                                                <td className='tasklist-cell'>{subtask.progress}</td>
                                            </tr>
                                        ))
                                    }
                                    <tr>
                                        <td colSpan={6} className='tasklist-cell add-task-cell fixed-column' onClick={() => setShowAddModal(true)}>+ Add new Milestone/Task</td>
                                    </tr>
                                </>
                            ))
                        }
                        {
                            taskList.length===0
                            && <tr>
                                <td colSpan={6} className='tasklist-cell add-task-cell fixed-column' onClick={() => setShowAddModal(true)}>+ Add new Milestone/Task</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            {showAddModal && <AddTaskModal tasks={taskList.map((task) => task.task)} onHide={() => setShowAddModal(false)}/>}
        </>
    )
}

export default Tasklist