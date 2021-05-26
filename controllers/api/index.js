const router = require('express').Router();

const userRoutes = require('./user-routes');
const checklistRoutes = require('./checklist-routes');
const taskRoutes = require('./task-routes');
const reminderRoutes = require('./reminder-routes')

router.use('/users', userRoutes);
router.use('/checklists', checklistRoutes);
router.use('/tasks', taskRoutes);
router.use('/reminders', reminderRoutes )

module.exports = router;