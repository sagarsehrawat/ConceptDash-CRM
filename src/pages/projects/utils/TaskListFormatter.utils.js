import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import Architecture from './Architecture.json'
import Estimation from './Estimation.json'
import Transportation from './Transportaion.json'
import Municipal from './Municipal.json'

const tasklistFormatter = (department) => {
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
}

export default tasklistFormatter;