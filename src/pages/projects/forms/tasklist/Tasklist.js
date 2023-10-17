import React, { useEffect, useState } from 'react'
import './Tasklist.css'
import moment from 'moment'
import TFIcon from '../../../../components/ui/TFIcon/TFIcon'
import ICONS from '../../../../constants/Icons'
import TFChip from '../../../../components/ui/TFChip/TFChip'

const Tasklist = ({ taskList, setTaskList, openTasks, setOpenTasks }) => {
    const handleTaskListChange = (taskId, subtaskId, key, value) => {
        console.log(taskId, subtaskId, key, value)
        switch (key) {
            case 'status':
                setTaskList(prev => {
                    return prev.map(task => {
                        if (task.taskId === taskId) {
                            const updatedTask = {
                                ...task,
                                subtasks: task.subtasks.map(subtask => {
                                    if(subtask.taskId === subtaskId){
                                        return {...subtask, status: value};
                                    }
                                    return subtask;
                                })
                            };

                            updatedTask.status = calculateTaskStatus(updatedTask);

                            return updatedTask;
                        }
                        return task;
                    })
                })
                break;

            default:
                break;
        }
    }

    useEffect(() => {
      console.log(taskList)
    }, [taskList])
    

    const handleClickMilestone = (taskId) => {
        setOpenTasks(prev => {
            if (prev.includes(taskId)) {
                return prev.filter(id => id !== taskId);
            } else {
                return [...prev, taskId];
            }
        });
    }

    const calculateTaskStatus = (task) => {
        const subtaskStatuses = task.subtasks.map(subtask => subtask.status);

        if (subtaskStatuses.every(status => status === 'Completed')) {
            return 'Completed';
        } else if (subtaskStatuses.some(status => status === 'In Progress' || status === 'Completed')) {
            return 'In Progress';
        } else {
            return 'Not Started';
        }
    }

    const calculateTaskProgress = (task) => {
        const subtaskProgresses = task.subtasks.map(subtask => subtask.progress);

        // Handle the case where there are no subtasks.
        if (subtaskProgresses.length === 0) {
            return 0;
        }

        const sumOfSubtaskProgresses = subtaskProgresses.reduce((accumulator, progress) => accumulator + progress, 0);
        return sumOfSubtaskProgresses / subtaskProgresses.length;
    }

    return (
        <>
            <div className='tasklist-wrapper'>
                <table className='tasklist-table w-100'>
                    <thead className='fixed-table-header'>
                        <tr>
                            <th className='tasklist-table-header fixed-column' style={{ width: '256px' }}>Milestone/ Task</th>
                            <th className='tasklist-table-header' style={{ width: '120px' }}>Due Date</th>
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
                                        <td className='tasklist-cell'>{moment(task.endDate).format('DD-MM-YYYY')}</td>
                                        <td className='tasklist-cell'><TFChip value={task.status} /></td>
                                        <td className='tasklist-cell'></td>
                                        <td className='tasklist-cell'><TFChip name='priority' value={task.priority} options={['Low', 'Medium', 'High', 'Critical']} onChange={(name, value) => handleTaskListChange(task.taskId, null, name, value)} /></td>
                                        <td className='tasklist-cell'>{task.progress}</td>
                                    </tr>
                                    {
                                        openTasks.includes(task.taskId)
                                            ? task.subtasks.map(subtask => (
                                                <tr>
                                                    <td className='tasklist-cell fixed-column' style={{ borderLeft: '1px solid #EBEDF8', borderRight: '1px solid #EBEDF8', paddingLeft: '36px' }}>{subtask.task}</td>
                                                    <td className='tasklist-cell'>{moment(subtask.endDate).format('DD-MM-YYYY')}</td>
                                                    <td className='tasklist-cell'><TFChip name='status' value={subtask.status} options={['Not Started', 'In Progress', 'Completed']} onChange={(name, value) => handleTaskListChange(subtask.parentId, subtask.taskId, name, value)} /></td>
                                                    <td className='tasklist-cell'>{subtask.assignedTo}</td>
                                                    <td className='tasklist-cell'><TFChip name='priority' value={subtask.priority} options={['Low', 'Medium', 'High', 'Critical']} onChange={(name, value) => handleTaskListChange(subtask.parentId, subtask.taskId, name, value)} /></td>
                                                    <td className='tasklist-cell'>{subtask.progress}</td>
                                                </tr>
                                            ))
                                            : <></>
                                    }
                                </>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Tasklist