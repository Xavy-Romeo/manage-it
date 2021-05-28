const router = require('express').Router();
const {User, Checklist, Task} = require('../models');
const withAuth = require('../utils/auth');
const cron = require('node-cron');

// get dashboard page
router.get('/', withAuth, (req, res) => {
    Checklist.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'checklist_name', 'user_id'],
        include: [
            {
                model: Task,
                attributes: ['id', 'name', 'completion', 'due_date'],
                include: {
                    model: User,
                    attributes: ['name']
                }
            },
            {
                model: User,
                attributes: ['name']
            }
        ]
    })
    .then(dbChecklistData => {
        const checklists = dbChecklistData.map(checklist => checklist.get({plain: true}));
        console.log(checklists);
        res.render('dashboard', {checklists, loggedIn: true});
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;