// import models
const User = require('./User');
const Checklist = require('./Checklist');
const Task = require('./Task');

// User has many checklists
User.hasMany(Checklist, {
    foreignKey: 'user_id'
});

// Checklist belongs to one user
Checklist.belongsTo(User, {
    foreignKey: 'user_id'
});

// Checklist has many tasks
Checklist.hasMany(Task, {
    foreignKey: 'checklist_id'
});

// Task belongs to Checklist
Task.belongsTo(Checklist, {
    foreignKey: 'checklist_id'
});

module.exports = {
    User,
    Checklist,
    Task
}