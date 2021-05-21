const { Checklist } = require('../models');

const checklistData = [
    {
        checklist_name: 'MondayWednesdayFriday',
        user_id: 1
    },
    {
        checklist_name: 'TuesdayThursday',
        user_id: 1
    },
    {
        checklist_name: 'Manage Microsoft',
        user_id: 2
    },
    {
        checklist_name: 'Donate more money',
        user_id: 2
    },
    {
        checklist_name: 'Manage Marketing',
        user_id: 3
    },
    {
        checklist_name: 'Eat an apple',
        user_id: 3
    }
];

const seedChecklist = () => Checklist.bulkCreate(checklistData);

module.exports = seedChecklist;