import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import Architecture from './Architecture.json'
import Estimation from './Estimation.json'
import Transportation from './Transportaion.json'
import Municipal from './Municipal.json'

const TaskListUtils = (setTaskList) => ({
    calculateTaskStatus : (task) => {
        const subtaskStatuses = task.subtasks.map(subtask => subtask.status);
    
        if (subtaskStatuses.every(status => status === 'Completed')) {
            return 'Completed';
        } else if (subtaskStatuses.some(status => status === 'In Progress' || status === 'Completed')) {
            return 'In Progress';
        } else {
            return 'Not Started';
        }
    },

    calculateTaskProgress : (task) => {
        const subtaskProgresses = task.subtasks.map(subtask => subtask.progress);
    
        // Handle the case where there are no subtasks.
        if (subtaskProgresses.length === 0) {
            return 0;
        }
    
        const sumOfSubtaskProgresses = subtaskProgresses.reduce((accumulator, progress) => accumulator + progress, 0);
        return sumOfSubtaskProgresses / subtaskProgresses.length;
    },

    taskListFormatter : (department) => {
        let tasks;
        switch (department) {
            case 'Architecture':
                tasks = Architecture;
                break;
            case 'Estimation':
                tasks = Estimation;
                break;
            case 'Municipal':
                tasks = Municipal;
                break;
            case 'Transportation':
                tasks = Transportation;
                break;
            default:
                tasks = [];
                break;
        }
    
        tasks.forEach(task => {
            task.taskId = uuidv4();
            task.startDate = moment();
            task.endDate = moment();
            task.priority = 'Medium'
            task.progress = 0;
            task.status = 'Not Started';
            task.children = []
    
            task.subtasks.map(subtask => {
                subtask.taskId = uuidv4();
                task.children.push(subtask.taskId);
                subtask.parentId = task.taskId;
                subtask.startDate = moment();
                subtask.endDate = moment();
                subtask.progress = 0;
                subtask.status = 'Not Started';
                subtask.priority = 'Medium'
                subtask.assignedTo = '';
                subtask.assignedToId = null;
            })
        });
    
        return tasks;
    },
    
    handleTaskListChange : (taskId, subtaskId, key, value) => {
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

                            updatedTask.status = TaskListUtils(setTaskList).calculateTaskStatus(updatedTask);

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
})

export default TaskListUtils;