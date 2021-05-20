const { Task } = require('../models');

const taskData = [
    {
        checklist_id: 1,
        name: 'Make Food',
        completion: true,
        due_date: null
    },
    {
        checklist_id: 1,
        name: 'Procrasinate Weekly Challenge',
        completion: false,
        due_date: null
    },
    {
        checklist_id: 2,
        name: 'Do Module I forgot to do',
        completion: true,
        due_date: null
    },
    {
        checklist_id: 2,
        name: 'Attend class',
        completion: false,
        due_date: null
    },
    {
        checklist_id: 3,
        name: 'Find Windows 9',
        completion: true,
        due_date: null
    },
    {
        checklist_id: 3,
        name: 'Make Windows 20',
        completion: true,
        due_date: null
    },
    {
        checklist_id: 4,
        name: 'make sure kids go to college',
        completion: true,
        due_date: null
    },
    {
        checklist_id: 4,
        name: 'Fund Covid Some More',
        completion: true,
        due_date: null
    },
    {
        checklist_id: 5,
        name: 'Make a Commercial',
        completion: false,
        due_date: null
    },
    {
        checklist_id: 5,
        name: 'Plan a demonstration',
        completion: false,
        due_date: null
    },
    {
        checklist_id: 6,
        name: 'Buy Apple',
        completion: true,
        due_date: null
    },
    {
        checklist_id: 6,
        name: 'Eat Apple',
        completion: false,
        due_date: null
    },
];

const seedTasks = () => Task.bulkCreate(taskData);

module.exports = seedTasks;