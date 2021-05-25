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

// User has many tasks
User.hasMany(Task, {
    foreignKey: 'user_id'
});

// Checklist has many tasks
Checklist.hasMany(Task, {
    foreignKey: 'checklist_id'
});

// Task belongs to one user
Task.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// Task belongs to Checklist
Task.belongsTo(Checklist, {
    foreignKey: 'checklist_id',
    onDelete: 'SET NULL'
});

module.exports = {
    User,
    Checklist,
    Task
}