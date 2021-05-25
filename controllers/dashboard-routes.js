const router = require('express').Router();
const {User, Checklist, Task} = require('../models');
const withAuth = require('../utils/auth');
const cron = require('node-cron')

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
        // cron.schedule('* * * * *', () => {
        //     console.log('Make a call to twilio');
        // });
        const checklists = dbChecklistData.map(checklist => checklist.get({plain: true}));
        res.render('dashboard', {checklists, loggedIn: true});
        console.log(dbChecklistData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;