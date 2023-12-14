import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import Architecture from './Architecture.json';
import Estimation from './Estimation.json';
import Transportation from './Transportaion.json'
import Municipal from './Municipal.json';
import SitePlanSubdivision from './SitePlanSubdivision.json'

class TaskListUtils {
    constructor(setTaskList = null) {
        this.setTaskList = setTaskList;
    }

    static taskListFormatter(department) {
        let tasks;
        switch (department) {
            case 'Architecture & Planning':
                tasks = Architecture;
                break;
            case 'Estimation':
                tasks = Estimation;
                break;
            case 'Municipal':
                tasks = Municipal;
                break;
            case 'Traffic and transportation Engineering':
                tasks = Transportation;
                break;
            case 'Site plan subdivision':
                tasks = SitePlanSubdivision;
                break;
            default:
                tasks = [];
                break;
        }

        tasks.forEach(task => {
            task.taskId = uuidv4();
            task.startDate = moment();
            task.endDate = moment();
            task.priority = 'Medium';
            task.progress = 0;
            task.status = 'Not Started';
            task.children = [];

            task.subtasks.map(subtask => {
                subtask.taskId = uuidv4();
                task.children.push(subtask.taskId);
                subtask.parentId = task.taskId;
                subtask.startDate = moment();
                subtask.endDate = moment();
                subtask.progress = 0;
                subtask.status = 'Not Started';
                subtask.priority = 'Medium';
                subtask.assignedTo = '';
                subtask.assignedToId = null;
            });
        });

        return tasks;
    }

    _calculateTaskStatus(task) {
        const subtaskStatuses = task.subtasks.map(subtask => subtask.status);

        if (subtaskStatuses.every(status => status === 'Completed')) {
            return 'Completed';
        } else if (subtaskStatuses.some(status => status === 'In Progress' || status === 'Completed')) {
            return 'In Progress';
        } else {
            return 'Not Started';
        }
    }

    _calculateTaskProgress(task) {
        const subtaskProgresses = task.subtasks.map(subtask => subtask.progress);

        if (subtaskProgresses.length === 0) {
            return 0;
        }

        const sumOfSubtaskProgresses = subtaskProgresses.reduce((accumulator, progress) => accumulator + progress, 0);
        return sumOfSubtaskProgresses / subtaskProgresses.length;
    }

    _calculateTaskEndDate(task) {
        const subtaskEndDates = task.subtasks.map(subtask => subtask.endDate);

        if (subtaskEndDates.length === 0) {
            return moment();
        }

        const maxEndDate = moment.max(subtaskEndDates);
        return maxEndDate;
    }

    _updateTask(taskId, key, value) {
        this.setTaskList(prev => {
            return prev.map(task => {
                if (task.taskId === taskId) {
                    return {
                        ...task,
                        [key]: value
                    };
                }
                return task;
            });
        });
    }

    _updateSubTask(taskId, subtaskId, key, value) {
        this.setTaskList(prev => {
            // Traverse the tasks to find the parent task
            return prev.map(task => {
                if (task.taskId === taskId) {
                    const updatedTask = {
                        ...task,
                        // Traverse the subtasks to find the subtask to update
                        subtasks: task.subtasks.map(subtask => {
                            if (subtask.taskId === subtaskId) {
                                // Handle adding id as well as value in case of typeahead component
                                if (key === 'assignedTo') {
                                    return { ...subtask, [key]: value.label, [`${key}Id`]: value.value };
                                }
                                return { ...subtask, [key]: value };
                            }
                            return subtask;
                        })
                    };

                    if (key === 'status') updatedTask.status = this._calculateTaskStatus(updatedTask);
                    if (key === 'endDate') updatedTask.endDate = this._calculateTaskEndDate(updatedTask);

                    return updatedTask;
                }
                return task;
            });
        });
    }

    handleTaskListChange(taskId, subtaskId, key, value) {
        switch (key) {
            case 'endDate':
            case 'status':
                this._updateSubTask(taskId, subtaskId, key, value);
                break;
            default:
                if (subtaskId === null) {
                    this._updateTask(taskId, key, value);
                } else {
                    this._updateSubTask(taskId, subtaskId, key, value);
                }
                break;
        }
    }

    addMilestone(milestone, selectedMilestone = null) {
        const newTaskId = uuidv4();
        this.setTaskList((prev) => {
            if (selectedMilestone === null) {
                prev.push({
                    task: milestone,
                    taskId: newTaskId,
                    startDate: moment(),
                    endDate: moment(),
                    priority: 'Medium',
                    progress: 0,
                    status: 'Not Started',
                    children: [],
                    subtasks: [],
                });
            }else{
                const selectedIndex = prev.findIndex(obj => obj.task === selectedMilestone);

                prev.splice(selectedIndex + 1, 0, {
                    task: milestone,
                    taskId: newTaskId,
                    startDate: moment(),
                    endDate: moment(),
                    priority: 'Medium',
                    progress: 0,
                    status: 'Not Started',
                    children: [],
                    subtasks: [],
                });
            }

            return prev;
        });

        return newTaskId
    }

    addTask(milestone, newTask) {
        const newTaskId = uuidv4();
        this.setTaskList((prev) => {
            return prev.map(task => {
                if(task.task === milestone){
                    return {
                        ...task,
                        children: [...task.children, newTaskId],
                        subtasks: [ ...task.subtasks, {
                            task: newTask,
                            taskId:  newTaskId,
                            parentId:  task.taskId,
                            startDate:  moment(),
                            endDate:  moment(),
                            progress:  0,
                            status:  'Not Started',
                            priority:  'Medium',
                            assignedTo:  '',
                            assignedToId:  null,
                        }]
                    };
                }

                return task;
            });
        })
    }
}

export default TaskListUtils;
