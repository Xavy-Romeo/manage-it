const router = require('express').Router();

const userRoutes = require('./user-routes');
const checklistRoutes = require('./checklist-routes');

router.use('/users', userRoutes);
router.use('/checklists', checklistRoutes);

module.exports = router;